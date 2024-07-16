const achievementRepo = require("../repositories/announcementRepository");

const NotableAchievement = require('../models/NotableAchievement');

const createNotableAchievement = async (req, res) => {
  try {
    const { achievements } = req.body;

    // Create a new NotableAchievement document
    const newNotableAchievement = new NotableAchievement({
      achievements: achievements || [],
    });

    // Save the new NotableAchievement document
    await newNotableAchievement.save();

    return res.status(201).json({ message: 'NotableAchievement created successfully', notableAchievement: newNotableAchievement });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createNotableAchievement,
};
