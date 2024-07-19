const Announcement = require("../models/announcementModel");
const crudRepo = require("./crud");

class announcementRepository extends crudRepo {
  constructor() {
    super(Announcement);
  }

  update = async (id, updateFields) => {
    try {
      const updatedAnnouncement = await this.model.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true, runValidators: true } // `new: true` returns the updated document
      );
      return updatedAnnouncement;
    } catch (error) {
      console.log("crud error : " + error);
      throw error;
    }
  };
}

module.exports = announcementRepository;
