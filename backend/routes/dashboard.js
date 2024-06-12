const express = require('express');
const router = express.Router();
const { getDashboardData, createDashboardData } = require('../controllers/dashboardController');

router.get('/', getDashboardData);
router.post('/', createDashboardData);

module.exports = router;
