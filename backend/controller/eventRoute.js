// const express = require("express");
// const userSchema = require("../model/userSchema");
// const eventSchema = require("../model/eventSchema");
// const feedbackSchema = require("../model/feedbackSchema");
// const eventRoute = express.Router();
// const mongoose = require("mongoose");

// // --------------------------------------------------------------------------------
// // User
// eventRoute.get("/user-list", (req,res) => {
//     userSchema.find((err, data) => {
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// })
// eventRoute.post("/create-user", (req,res) => {
//     userSchema.create(req.body, (err,data) => {
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// })
// eventRoute.route("/check-user/:uname")
// .get((req, res) => {
//     userSchema.findOne({username: req.params.uname}, (err,data) => {
//         if(err)
//             return err;
//         else
//             res.json(data);

//     })
// })

// eventRoute.route("/update-user/:id")
// .get((req, res) => {
//     userSchema.findById(mongoose.Types.ObjectId(req.params.id), (err,data) => {
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// }).put((req, res) => {
//     userSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
//     {$set:req.body},
//     (err,data) => {
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// })
// eventRoute.delete("/delete-user/:id",(req,res)=>{
//     userSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
//     (err,data)=>{
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// })


// // -----------------------------------------------------------------------------------------
// // Events
// eventRoute.get("/event-list", (req,res) => {
//     eventSchema.find((err, data) => {
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// })

// eventRoute.route("/check-event/:id")
// .get((req, res) => {
//     eventSchema.findById(mongoose.Types.ObjectId(req.params.id), (err,data) => {
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// })

// eventRoute.post("/create-event", (req,res) => {
//     eventSchema.create(req.body, (err,data) => {
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// })

// eventRoute.route("/update-event/:id")
// .get((req, res) => {
//     eventSchema.findById(mongoose.Types.ObjectId(req.params.id), (err,data) => {
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// }).put((req, res) => {
//     eventSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
//     {$set:req.body},
//     (err,data) => {
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// })
// eventRoute.delete("/delete-event/:id",(req,res)=>{
//     eventSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
//     (err,data)=>{
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// })



// // Feedback
// eventRoute.post("/post-feedback", (req,res) => {
//     feedbackSchema.create(req.body, (err,data) => {
//         if(err)
//             return err;
//         else
//             res.json(data);
//     })
// })

// module.exports = eventRoute;



const express = require("express");
const userSchema = require("../model/userSchema");
const eventSchema = require("../model/eventSchema");
const feedbackSchema = require("../model/feedbackSchema");
const eventRoute = express.Router();
const mongoose = require("mongoose");

// --------------------------------------------------------------------------------
// User Routes
eventRoute.get("/user-list", async (req, res) => {
    try {
        const users = await userSchema.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users', error: err });
    }
});

eventRoute.post("/create-user", async (req, res) => {
    try {
        const user = await userSchema.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err });
    }
});

eventRoute.get("/check-user/:uname", async (req, res) => {
    try {
        const user = await userSchema.findOne({ username: req.params.uname });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error checking user', error: err });
    }
});

eventRoute.route("/update-user/:id")
.get(async (req, res) => {
    try {
        const user = await userSchema.findById(mongoose.Types.ObjectId(req.params.id));
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err });
    }
}).put(async (req, res) => {
    try {
        const updatedUser = await userSchema.findByIdAndUpdate(
            mongoose.Types.ObjectId(req.params.id),
            { $set: req.body },
            { new: true } // Return the updated document
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err });
    }
});

eventRoute.delete("/delete-user/:id", async (req, res) => {
    try {
        const deletedUser = await userSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id));
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
});

// -----------------------------------------------------------------------------------------
// Event Routes
eventRoute.get("/event-list", async (req, res) => {
    try {
        const events = await eventSchema.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving events', error: err });
    }
});

eventRoute.get("/check-event/:id", async (req, res) => {
    try {
        const event = await eventSchema.findById(mongoose.Types.ObjectId(req.params.id));
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving event', error: err });
    }
});

eventRoute.post('/create-event', async (req, res) => {
    const newEvent = new eventSchema(req.body); // Use eventSchema instead of Event
    try {
        await newEvent.save();
        res.status(201).json(newEvent); // Respond with the created event
    } catch (error) {
        console.error("Error saving event:", error); // Log the error for debugging
        res.status(400).json({ message: error.message }); // Respond with error message
    }
});

eventRoute.route("/update-event/:id")
.get(async (req, res) => {
    try {
        const event = await eventSchema.findById(mongoose.Types.ObjectId(req.params.id));
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving event', error: err });
    }
}).put(async (req, res) => {
    try {
        const updatedEvent = await eventSchema.findByIdAndUpdate(
            mongoose.Types.ObjectId(req.params.id),
            { $set: req.body },
            { new: true } // Return the updated document
        );
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(500).json({ message: 'Error updating event', error: err });
    }
});

eventRoute.delete("/delete-event/:id", async (req, res) => {
    try {
        const deletedEvent = await eventSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id));
        res.status(200).json(deletedEvent);
    } catch (err) {
        res.status(500).json({ message: 'Error deleting event', error: err });
    }
});

// -----------------------------------------------------------------------------------------
// Feedback Routes
eventRoute.post("/post-feedback", async (req, res) => {
    try {
        const feedback = await feedbackSchema.create(req.body);
        res.status(201).json(feedback);
    } catch (err) {
        res.status(400).json({ message: 'Error posting feedback', error: err });
    }
});


module.exports = eventRoute;
