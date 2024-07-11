const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // To be removed later
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  displayname: {
    type: String,
    required: true,
  },
  enroll_number: {
    type: String,
    unique: true,
    length: 11,
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
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
