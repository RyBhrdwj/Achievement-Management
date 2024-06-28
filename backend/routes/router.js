const express = require('express');
const router = express.Router();

// Define the routes
router.get('/', (req, res) => { res.send('base api route'); });

module.exports = router;