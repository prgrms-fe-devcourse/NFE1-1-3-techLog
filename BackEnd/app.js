require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const postRoutes = require(path.join(__dirname, './routes/postRoutes'));
const userRoutes = require(path.join(__dirname, './routes/userRoutes'));
const readRoutes = require(path.join(__dirname, './routes/readRoutes'));
const readAllRoutes = require(path.join(__dirname, './routes/readAllRoutes'));
const deleteRoutes = require(path.join(__dirname, './routes/deleteRoutes'));
const updateRoutes = require('./routes/updateRoutes');

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 설정
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/posts', readRoutes);
app.use('/posts', readAllRoutes);
app.use('/posts', deleteRoutes);
app.use('/posts', updateRoutes);

module.exports = app;
