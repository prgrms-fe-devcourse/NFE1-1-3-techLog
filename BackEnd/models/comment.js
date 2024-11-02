const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  // 한국 시간으로 설정
  createdAt: {
    type: String,
    default: () => moment.tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'),
  },
});

// MongoDB에 저장하기 전 로그 추가
commentSchema.pre('save', function (next) {
  console.log('새 댓글 저장:', {
    content: this.content,
    createdAt: this.createdAt,
  });
  next();
});

// 가상 필드: 시간을 좀 더 읽기 쉽게 변환
commentSchema.virtual('formattedCreatedAt').get(function () {
  return moment(this.createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow();
});

// WebSocket으로 전송할 때 사용할 형식으로 변환하는 메서드 추가
commentSchema.methods.toWebSocket = function () {
  return {
    content: this.content,
    createdAt: this.createdAt,
    formattedCreatedAt: this.formattedCreatedAt,
  };
};

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
