const path = require('path');
const Post = require(path.join(__dirname, '../../models/post'));

exports.createPost = async (req, res) => {
  try {
    // cookies에서 토큰 확인
    if (!req.cookies.token) {
      return res.status(401).json({ 
        status: 401,
        success: false,
        message: "토큰이 존재하지 않습니다."
      });
    }

    // 토큰 정보 추가
    const post = new Post({
      ...req.body,
      authorId: req.cookies.token  // req.cookie가 아닌 req.cookies 사용
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};