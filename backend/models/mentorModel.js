const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  mentorId : {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  studentUserIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  }
});

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
