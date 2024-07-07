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
  enroll_number: {
    type: String,
    unique: true,
    length: 11,
    required: true,
  },
  // drop down menu se select
  branch_section: {
    type: String,
    required: true,
  },
  // checks if emaile ends with @bpitindia.edu.in
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@bpitindia\.edu\.in$/,
  },
  team_name: {
    type: String,
    required: true,
  },
  member_role: {
    type: String,
    required: true,
  },
  // as user is registered first, then do we even need below code??

  // achievements: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Achievement",
  //   },
  // ],
  faculty: {
    type: Boolean,
    required: true,
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
