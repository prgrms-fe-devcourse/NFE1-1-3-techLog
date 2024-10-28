const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const postSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  shortAnswer: { type: String, required: true },
  detailedAnswer: { type: String, required: true },
  authorId: { type: String, required: true },

  //한국 시간으로 변경
  createdAt: { 
    type: String, 
    default: () => moment.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss") 
  },
  updatedAt: { 
    type: String, 
    default: () => moment.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss") 
  }
});

// 데이터가 업데이트될 때마다 updatedAt 필드를 자동으로 갱신
postSchema.pre('save', function(next) {
  this.updatedAt = moment.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
  next();
});

postSchema.pre('findOneAndUpdate', function(next) {
  this._update.updatedAt = moment.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;