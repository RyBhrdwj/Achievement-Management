const mentorRepo = require("../repositories/mentorRepo");

// TODO: Add validation to the request body in methods that require it
class mentorController {
  constructor() {
    this.mentor = new mentorRepo();
  }

  // Add a new mentor
  addMentor = async (req, res) => {
    try {
      const mentor = await this.mentor.addMentor(req.body);

      res.status(201).json(mentor);
    } catch (error) {
      console.log("controller error : " + error);

      res.status(400).json({ message: error.message });
    }
  };

  // Get a mentor by ID
  getMentorById = async (req, res) => {
    try {
      const mentor = await this.mentor.getMentorById(req.params.id);

      res.status(200).json(mentor);
    } catch (error) {
      console.log("controller error : " + error);

      res.status(400).json({ message: error.message });
    }
  };

  // Get all students for a specific mentor
  getStudentsByMentorId = async (req, res) => {
    try {
      const students = await this.mentor.getStudentsByMentorId(req.params.id);

      res.status(200).json(students);
    } catch (error) {
      console.log("controller error : " + error);

      res.status(400).json({ message: error.message });
    }
  };

  // Add a student to a mentor
  addStudentToMentor = async (req, res) => {
    try {
      const mentor = await this.mentor.addStudentToMentor(req.params.id, req.body.studentUserId);
      
      res.status(200).json(mentor);
    } catch (error) {
      console.log("controller error : " + error);

      res.status(400).json({ message: error.message });
    }
  };

  // Remove a student from a mentor
  removeStudentFromMentor = async (req, res) => {
    try {
      const mentor = await this.mentor.removeStudentFromMentor(req.params.id, req.body.studentUserId);
      
      res.status(200).json(mentor);
    } catch (error) {
      console.log("controller error : " + error);

      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = new mentorController();
