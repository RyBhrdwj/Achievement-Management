const achievementRepo = require("../repositories/achievementRepository");

class AchievementController {
  constructor() {
    this.achievement = new achievementRepo();
  }

  addAchievement = async (req, res) => {
    try {
      const achievement = await this.achievement.create(req.body);
      res.status(201).json(achievement);
    } catch (error) {
      console.log("controller error : " + error);
      res.status(400).json({ message: error.message });
    }
  };

  deleteAchievement = async (req, res) => {
    try {
      const achievement = await this.achievement.destroy(req.params.id);
      res.status(200).json(achievement);
    } catch (error) {
      console.log("controller error : " + error);
      res.status(400).json({ message: error.message });
    }
  };

  getAchievements = async (req, res) => {
    try {
      const achievements = await this.achievement.getAchievementsByUserId(
        req.params.userId
      );
      res.status(200).json(achievements);
    } catch (error) {
      console.log("controller error : " + error);
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = new AchievementController();
