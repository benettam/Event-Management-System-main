const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, {
    collection: "feedback" // Adjust the collection name as necessary
});

module.exports = mongoose.model("Feedback", feedbackSchema);
