const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  userId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    type: String,
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
  location: { // location of the event or the link to the event
    type: String,
    required: true,
  },
  date: {
    type: Date,
    // required: true,
  },
  result: {
    type: String,
    enum: ["participant", "winner", "runner up"],
    required: true,
  },
  proof: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: null, // null -> not checked by mentor, false -> rejected, true -> accepted
    required: true,
  },
});

module.exports = mongoose.model("Achievement", achievementSchema);
