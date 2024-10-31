const path = require('path');
const Post = require(path.join(__dirname, '../../models/post'));

exports.createPost = async (req, res) => {
  try {
    // cookies에서 토큰 확인
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        status: 401,
        success: false,
        message: "인증 정보가 올바르지 않습니다."
      });
    }

    const post = new Post({
      ...req.body,
      authorId: req.user.id
    });

    const savedPost = await post.save();
    res.status(201).json({
      status: 201,
      success: true,
      data: savedPost
    });
  } catch (err) {
    console.error('Create Post Error:', err);
    res.status(400).json({ 
      status: 400,
      success: false,
      message: err.message 
    });
  }
};