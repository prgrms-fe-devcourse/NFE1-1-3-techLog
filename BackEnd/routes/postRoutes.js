const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Post Create Route
router.post('/create', postController.createPost);

module.exports = router;
