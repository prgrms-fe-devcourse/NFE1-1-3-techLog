const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  question: { type: String, required: true },
  simpleAnswer: { type: String },
  detailAnswer: { type: String },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
