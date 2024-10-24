// const { Int32, Timestamp } = require("mongodb");
// const mongoose = require("mongoose");
// const eventSchema = new mongoose.Schema({
//     "name": {type:String, unique:true},
//     "date": {type:Date},
//     "startTime": {type: String},
//     "endTime": {type:String},
//     "place": {type:String},
//     "club": {type:String},
//     "description": {type:String},
//     "slots": {type: Number},
//     "registeredUsers" : {type:Array},
    

// }, {
//     collection: "events-record"
// })

// module.exports = mongoose.model("eventSchema", eventSchema);

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    date: { type: Date, required: true },
    startTime: { type: String },
    endTime: { type: String },
    place: { type: String },
    club: { type: String },
    description: { type: String },
    slots: { type: Number },
    registeredUsers: { type: Array },
}, {
    collection: "events-record" // The name of the collection in MongoDB
});

// Exporting the model using a singular name
module.exports = mongoose.model("Event", eventSchema); // Use "Event" instead of "eventSchema"
