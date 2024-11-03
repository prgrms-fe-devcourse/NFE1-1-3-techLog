const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsByPost,
} = require('../controllers/comments/commentController');

// 댓글 생성
router.post('/', createComment);

// 게시글별 댓글 조회
router.get('/post/:postId', getCommentsByPost);

module.exports = router;
