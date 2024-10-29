require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // CORS 추가
const postRoutes = require(path.join(__dirname, './routes/postRoutes'));
const userRoutes = require(path.join(__dirname, './routes/userRoutes'));

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
app.use(cors()); // CORS 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 설정
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

module.exports = app;
