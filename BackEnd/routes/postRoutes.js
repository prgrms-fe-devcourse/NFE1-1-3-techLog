const express = require('express');
const router = express.Router();
const path = require('path');
const postController = require(
  path.join(__dirname, '../controllers/postController'),
);
const verifyToken = require('../middleware/auth');


// Create Post - 토큰 검증 미들웨어 추가
router.post('/create', verifyToken, postController.createPost);

module.exports = router;
