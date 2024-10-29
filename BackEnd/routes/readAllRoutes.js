const express = require('express');
const router = express.Router();
const path = require('path');
const readAllController = require(
    path.join(__dirname, '../controllers/readAllController')
);

// Get All Posts - 공개 API
router.get('/all', readAllController.readAllPosts);

module.exports = router;