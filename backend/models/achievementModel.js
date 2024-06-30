const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type:String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  date:{
    type: Date,
    required: true,
  },
  isTechnical: {
    type: Boolean,
    required: true,
  },
  result: {
    type: String,
    enum: ['participation', 'won'],
    required: true,
  },
  proof: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = mongoose.model("Achievement", achievementSchema);
