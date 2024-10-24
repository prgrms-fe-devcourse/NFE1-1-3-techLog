const Post = require('../models/post');

exports.createPost = async (req, res) => {
  try {
    const { post_id, question, simpleAnswer, detailAnswer, author } = req.body;

    const newPost = new Post({
      post_id,
      question,
      simpleAnswer,
      detailAnswer,
      author,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};
