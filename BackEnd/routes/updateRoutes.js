const express = require('express');
const router = express.Router();
const updateController = require('../controllers/updateController');
const verifyToken = require('../middleware/auth');

// Update Post Route
router.put('/update/:id', verifyToken, updateController.updatePost);

module.exports = router;