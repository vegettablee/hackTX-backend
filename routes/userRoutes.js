const express = require('express');
const router = express.Router();
const { getUserVehicleResults } = require('../controllers/userController');

router.get('/:id', getUserVehicleResults);

module.exports = router;
