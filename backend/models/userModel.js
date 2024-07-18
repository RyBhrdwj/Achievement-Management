const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  enrollmentNumber: {
    type: String,
    unique: true, // Ensures uniqueness of enrollment numbers
    maxlength: 11, // Corrected from 'length' to 'maxlength'
  },
  branch_section: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@bpitindia\.edu\.in$/, // Validates email format
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
