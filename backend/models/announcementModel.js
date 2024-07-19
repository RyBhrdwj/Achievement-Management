const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  achievement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Achievement",
  },
  message: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Announcement", announcementSchema);
