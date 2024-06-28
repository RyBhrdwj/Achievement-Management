const mongoose = require("mongoose");

const notableAchievementSchema = new mongoose.Schema({
  achievements: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Achievement" }],
  },
});

module.exports = mongoose.model("NotableAchievement", notableAchievementSchema);
