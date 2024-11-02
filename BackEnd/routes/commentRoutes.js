const express = require('express');
const router = express.Router();
const path = require('path');

const commentController = require(
  path.join(__dirname, '../controllers/comments/commentController'),
);
const verifyToken = require(path.join(__dirname, '../middleware/auth'));

router.post('/:postId', verifyToken, commentController.createComment);
router.get('/post/:postId', commentController.getPostComments);

module.exports = router;
