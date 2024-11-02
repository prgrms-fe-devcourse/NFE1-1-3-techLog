const path = require('path');
const Post = require(path.join(__dirname, '../../models/post'));

exports.readAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(
      {},
      {
        _id: 1,
        authorId: 1,
        title: 1,
        category: 1,
        shortAnswer: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    ).populate('authorId', 'username').sort({ createdAt: -1 }); // authorId 필드를 populate

    const formattedPosts = posts.map(post => ({
      _id: post._id,
      username: post.authorId ? post.authorId.username : 'Unknown', // authorId가 없는 경우 처리
      title: post.title,
      category: post.category,
      shortAnswer: post.shortAnswer,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    res.status(200).json({
      success: true,
      count: formattedPosts.length,
      data: formattedPosts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '서버 에러가 발생했습니다.',
      error: err.message,
    });
  }
};