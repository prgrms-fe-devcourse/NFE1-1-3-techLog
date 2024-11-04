const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const commentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: () => moment.tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'),
  },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
