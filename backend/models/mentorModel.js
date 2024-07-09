const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  mentor_name: {
    type: String,
    required: true
  },
  phone_no: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  studentUserIds: [
    {
      type: String,
      // replace name by id
      default: ["aditya gaur", "nikhil kumar"]
    }
  ],
  // change in future
//   studentUserIds: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User"
//     }
//   ],
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  }
});

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
