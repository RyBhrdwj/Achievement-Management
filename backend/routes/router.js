const express = require("express");
const router = express.Router();
const {
  validateVerificationStatus,
  validateAchievement,
} = require("../middlewares/validationMiddleware");

const achievementController = require("../controllers/achievementController");
const notificationController = require("../controllers/notificationController");

// Define the routes
router.get("/", (req, res) => {
  res.send("base api route");
});
router.get("/achievements/:userId", achievementController.getAchievements);
router.get("/notifications/:userId", notificationController.getNotifications);

router.post(
  "/add-achievement",
  validateAchievement,
  achievementController.addAchievement
);
router.post(
  "/add-notification",
  notificationController.addNotification
)
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
