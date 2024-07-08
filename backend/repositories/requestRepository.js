const Request = require("../models/requestModel");
const crudRepo = require("./crud");

class RequestRepository extends crudRepo {
    constructor() {
      super(Request);
    }
    getRequestsbyMentorId = async (mentorId) => {
        try {
          const requests = await this.model.find({ mentor: mentorId }).populate('achievement');
          return requests;
        } catch (err) {
          throw new Error(err.message);
        }
      }
    
      addRequest = async (data) => {
        try {
          const newRequest = await this.create(data);
          return newRequest;
        } catch (err) {
          throw new Error(err.message);
        }
      }
    }
    
    module.exports = RequestRepository;