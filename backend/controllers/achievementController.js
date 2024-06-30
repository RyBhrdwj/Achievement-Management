const achievementRepo = require("../repositories/achievementRepository");

const getAchievements = async (req, res) => {
  const achievements = await achievementRepo.getAll();
  res.json(achievements);
};