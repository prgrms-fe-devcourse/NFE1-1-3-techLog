const Comment = require('../../models/comment');

exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);

    // Socket.IO가 있을 때만 실시간 이벤트 발송
    if (req.app.locals.io) {
      req.app.locals.io
        .to(`post_${comment.postId}`)
        .emit('comment_added', comment);
    }

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
