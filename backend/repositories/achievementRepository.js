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
        runValidators: true,
      });

      return achievement;
    } catch (error) {
      console.log("repository error : " + error);
      throw error;
    }
  };

  getAchievementsByUserId = async (userId) => {
    try {
      const achievements = await this.model.find({ userId: userId });
      return achievements;
    } catch (error) {
      console.log("repository error : " + error);
      throw error;
    }
  };

  getAchievementsByUserIds = async (userIds) => {
    try {
      const achievements = await this.model.find({ userId: { $in: userIds } });
      return achievements;
    } catch (error) {
      console.log("repository error : " + error);
      throw error;
    }
  };
}

module.exports = achievementRepo;
