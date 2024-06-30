const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');

// Define the routes
router.get('/', (req, res) => { res.send('base api route'); });
router.get('/achievements/:userId', achievementController.getAchievements);
router.post('/add-achievement', achievementController.addAchievement);
router.delete('/delete-achievement/:id', achievementController.deleteAchievement);

module.exports = router;