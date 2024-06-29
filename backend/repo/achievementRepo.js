const Achievement = require("../models/achievementModel");
const crudRepo = require("./crud");

class achievementRepo extends crudRepo {
  constructor() {
    super(Achievement);
  }

  updateAchievement = async (id, data) => {
    try {
      const achievement = await this.model.findByIdAndUpdate(id, data, {
        new: true,
        overwrite: true,
        runValidators: true,
      });

      return achievement;
    } catch (error) {
      console.log("crud error : " + error);
      throw error;
    }
  };
}

module.exports = achievementRepo;
