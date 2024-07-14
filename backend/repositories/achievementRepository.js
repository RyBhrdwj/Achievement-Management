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
      const achievements = await this.model.find({ userId: userId }).populate("userId");
      
      return achievements;
    } catch (error) {
      console.log("repository error : " + error);
      throw error;
    }
  };

  getAchievementsByUserIdInCSV = async (userId) => {
    try {
      const achievements = await this.model.find({ userId: userId }).select("-userId -_id -__v");
      
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

  getAchievementsByUserIdsAndStatus = async (userIds, status) => {
    try {
      const achievements = await this.model.find({
        userId: { $in: userIds },
        verificationStatus: status,
      }).populate("userId");

      return achievements;
    } catch (error) {
      console.log("repository error : " + error);
      throw error;
    }
  };
}

module.exports = achievementRepo;
