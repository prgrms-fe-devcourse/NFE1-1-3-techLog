const Comment = require('../../models/comment');

exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({
      postId: req.params.postId,
      authorId: req.user.id,
      content: req.body.content
    });
    
    const savedComment = await comment.save();
    
    // WebSocket을 통해 실시간 알림
    req.app.locals.wss.broadcastComment(req.params.postId, {
      type: 'newComment',
      comment: savedComment
    });
    
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};