const Mentor = require("../models/mentorModel");
const crudRepo = require("./crud");

class mentorRepository extends crudRepo {
  constructor() {
    super(Mentor);
  }

  addMentor = async (data) => {
    try {
      const mentor = await this.model.create(data);
      return mentor;
    } catch (error) {
      console.log("repository error : " + error);
      throw error;
    }
  };

  getMentorById = async (mentorId) => {
    try {
      const mentor = await this.model.findById(mentorId);

      if (!mentor) {
        throw new Error("Mentor not found");
      }

      return mentor;
    } catch (error) {
      console.log("repository error : " + error);

      throw error;
    }
  };

  getStudentsByMentorId = async (mentorId) => {
    try {
      const mentor = await this.getMentorById(mentorId);

      return mentor.studentUserIds;
    } catch (error) {
      console.log("repository error : " + error);
      throw error;
    }
  };

  addStudentToMentor = async (mentorId, studentUserId) => {
    try {
      const mentor = await this.getMentorById(mentorId);

      mentor.studentUserIds.push(studentUserId);

      await mentor.save();
      return mentor;
    } catch (error) {
      console.log("repository error : " + error);
      throw error;
    }
  };

  removeStudentFromMentor = async (mentorId, studentUserId) => {
    try {
      const mentor = await this.getMentorById(mentorId);

      if (!mentor) {
        throw new Error("Mentor not found");
      }

      mentor.studentUserIds = mentor.studentUserIds.filter(
        (id) => id.toString() !== studentUserId.toString()
      );

      await mentor.save();
      return mentor;
    } catch (error) {
      console.log("repository error : " + error);
      throw error;
    }
  };
}

module.exports = mentorRepository;
