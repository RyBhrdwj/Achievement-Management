const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
    primaryKey: true,
  },
  displayname: {
    type: String,
    required: true,
  },
  member_role: {
    type: String,
    required: true,
  },
  team_name: {
    type: String,
    required: true,
  },
  faculty: {
    type: Boolean,
    required: true,
  },
  achievements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Achievement",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
