const express = require("express");
const mongoose = require("mongoose");
const eventRoute = require("./controller/eventRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// Load environment variables
require('dotenv').config(); // Ensure this is at the top of your file

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', // Change this to your frontend URL if different
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.error("Error occurred:", err));

// Routes
app.use('/eventRoute', eventRoute);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ message: "Resource not found" });
});

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error", error: err.message });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
