const express = require('express');
const router = express.Router();
const path = require('path');
const readController = require(
    path.join(__dirname, '../controllers/readController')
);

// Get Single Post - 공개 API
router.get('/read/:id', readController.readPost);

module.exports = router;