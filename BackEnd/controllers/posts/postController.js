const path = require('path');
const Post = require(path.join(__dirname, '../../models/post'));

// Create Post
exports.createPost = async (req, res) => {
  try {
    // 토큰 정보 추가
    const post = new Post({
      ...req.body,
      authorId: req.token, // 테스트용으로 토큰값을 authorId로 사용
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
