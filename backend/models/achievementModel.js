const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  isTechnical: {
    type: Boolean,
    required: true,
  },
  result: {
    type: String,
    enum: ["participant", "winner", "runner-up"],
    required: true,
  },
  proof: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("Achievement", achievementSchema);
