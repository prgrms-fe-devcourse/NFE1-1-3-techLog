const express = require('express');
const router = express.Router();
const path = require('path');
const postController = require(
  path.join(__dirname, '../controllers/postController'),
);

// Post Create Route
router.post('/create', postController.createPost);

module.exports = router;
