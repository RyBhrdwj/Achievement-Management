const express = require("express");
const router = express.Router();
const {
  validateVerificationStatus,
  validateAchievement,
} = require("../middlewares/validationMiddleware");

const achievementController = require("../controllers/achievementController");
const notificationController = require("../controllers/notificationController");
const requestController = require("../controllers/requestController");
const s3Router = require('../s3exp'); // Import the S3 routes

// Define the routes
router.get("/", (req, res) => {
  res.send("base api route");
});
router.get("/achievements/:userId", achievementController.getAchievements);
router.get("/notifications/:userId", notificationController.getNotifications);
router.get("/requests/:mentorId", requestController.getRequests);

router.post(
  "/add-achievement",
  validateAchievement,
  achievementController.addAchievement
);
router.post(
  "/add-notification",
  notificationController.addNotification
)
router.post(
  "/add-request",
  requestController.addRequest
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

router.use('/s3', s3Router);

module.exports = router;
