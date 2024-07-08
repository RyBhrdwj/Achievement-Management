const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema({
    user: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        type: String
    },
    mentor: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Mentor",
        type: String
    },
    message: {
        type: String,
        required: true
    },
},{ 
    timestamps:true
})


const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;  