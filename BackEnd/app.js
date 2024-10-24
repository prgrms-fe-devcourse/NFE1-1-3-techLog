require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const postRoutes = require('./routes/postRoutes');

const app = express();

// MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// 미들웨어 설정
app.use(express.json());

// 라우트 설정
// app.use('/posts', postRoutes);

module.exports = app;
