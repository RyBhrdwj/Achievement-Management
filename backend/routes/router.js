const express = require("express");
const router = express.Router();
const {
  validateVerificationStatus,
  validateAchievement,
} = require("../middlewares/validationMiddleware");

const achievementController = require("../controllers/achievementController");

// Define the routes
router.get("/", (req, res) => {
  res.send("base api route");
});
router.get("/achievements/:userId", achievementController.getAchievements);

router.post(
  "/add-achievement",
  validateAchievement,
  achievementController.addAchievement
);
router.put("/update-achievement/:id", achievementController.updateAchievement);

router.patch(
  "/verify-achievement/:id/:status",
  validateVerificationStatus,
  achievementController.verifyAchievement
);

router.delete(
  "/delete-achievement/:id",
  achievementController.deleteAchievement
);

module.exports = router;
