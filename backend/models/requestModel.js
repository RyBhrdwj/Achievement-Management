const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    mentor: {
        type: String,
        required: true
    },
    achievement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Achievement"
    }
}, {
    timestamps: true
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
