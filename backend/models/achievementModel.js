const mongoose = require("mongoose");

// TODO : Make sure there are no duplicate documents for the same userID

const achievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // type: String,
    // required: true,
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
    required: true,
  },
  is_Technical:{
    type:Boolean,
    required: true,
  },
  mode:{
    type: String,
    enum: ["online", "offline"],
    required: true,
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
  verificationStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
    required: true,
  },
});

module.exports = mongoose.model("Achievement", achievementSchema);
