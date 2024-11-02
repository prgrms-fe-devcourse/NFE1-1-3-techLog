const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const commentSchema = new Schema({
  // MongoDB의 ObjectId를 사용하여 User 모델 참조
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // MongoDB의 ObjectId를 사용하여 Post 모델 참조
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  //한국 시간으로 변경
  createdAt: {
    type: String,
    default: () => moment.tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'),
  },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
