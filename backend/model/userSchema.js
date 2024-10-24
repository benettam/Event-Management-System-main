// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//     "username": {type:String, unique:true},
//     "fullName": {type:String},
//     "email": { type: String, required: true, match: /.+\@.+\..+/ },
//     "phone": { type: String, required: true, match: /^\d{10}$/ },  // Example for a 10-digit phone number

//     "password": {type:String},
//     "bookedEvents": {type:Array},
    

// }, {
//     collection: "userrecord"
// })

// module.exports = mongoose.model("userSchema", userSchema);



const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema for bookedEvents (optional, if storing more info than just event IDs)
const bookedEventSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'eventSchema' },
    eventName: { type: String },
    bookingDate: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    fullName: { type: String },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    phone: { type: String, required: true, match: /^\d{10}$/ }, // Example for 10-digit phone numbers
    password: { type: String, required: true },
    bookedEvents: [bookedEventSchema] // Array of booked events with additional info
}, {
    collection: "userrecord"
});

// Password hashing before saving the user to the database
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // Hash password with salt rounds = 10
    }
    next();
});

// Method to compare input password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("userSchema", userSchema);
