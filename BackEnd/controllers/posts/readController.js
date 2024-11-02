// controllers/readController.js
const path = require('path');
const Post = require(path.join(__dirname, '../../models/post'));

exports.readPost = async (req, res) => {
  try {
    console.log('Requested ID:', req.params.id); // 디버깅용 로그

    const post = await Post.findById(req.params.id).populate('authorId', 'username');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: '해당 게시글을 찾을 수 없습니다.',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: post._id,
        username: post.authorId.username,
        title: post.title,
        category: post.category,
        shortAnswer: post.shortAnswer,
        detailedAnswer: post.detailedAnswer,
        authorId: post.authorId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  } catch (err) {
    console.error('Error:', err); // 디버깅용 로그

    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: '잘못된 ID 형식입니다.',
      });
    }

    res.status(500).json({
      success: false,
      message: '서버 에러가 발생했습니다.',
      error: err.message,
    });
  }
};
