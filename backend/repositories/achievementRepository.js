const Achievement = require("../models/achievementModel");
const crudRepo = require("./crud");
const redisClient = require('../redis/redisClient');

class AchievementRepository extends crudRepo {
  constructor() {
    super(Achievement);
  }

  async getAchievementsByUserId(userId) {
    try {
      const cacheKey = `achievements:user:${userId}`;
      const cachedAchievements = await redisClient.get(cacheKey);

      if (cachedAchievements) {
        return JSON.parse(cachedAchievements);
      }

      const achievements = await this.model.find({ userId }).populate("userId");
      await redisClient.set(cacheKey, JSON.stringify(achievements), 'EX', 3600); // Cache for 1 hour

      return achievements;
    } catch (error) {
      console.error("Repository error:", error);
      throw error;
    }
  }

  async getAchievementsByUserIdInCSV(userId) {
    try {

      const achievements = await this.model.find({ userId }).select("-userId -_id -__v");

      return achievements;
    } catch (error) {
      console.error("Repository error:", error);
      throw error;
    }
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

module.exports = AchievementRepository;
