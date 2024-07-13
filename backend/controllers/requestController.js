const RequestRepository = require("../repositories/requestRepository");

class RequestController {
  constructor() {
    this.request = new RequestRepository();
  }

  getRequests = async (req, res) => {
    try {
      const mentorId = req.params.mentorId;
    //   console.log(mentor)
      const requests = await this.request.getRequestsbyMentorId(mentorId);
      res.status(200).json(requests);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  addRequest = async (req, res) => {
    try {
      const data = req.body;
      const newRequest = await this.request.addRequest(data);
      res.status(201).json(newRequest);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  deleteRequest = async (req, res) => {
    try {
      const request = await this.request.destroy(req.params.id);
      res.status(200).json(request);
    } catch (error) {
      console.log("controller error : " + error);
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = new RequestController();
