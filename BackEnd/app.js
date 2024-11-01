// 1. 환경변수 설정
require('dotenv').config();
// .env 파일에 있는 환경변수들을 process.env로 불러옵니다.
// 예: process.env.MONGODB_URI처럼 민감한 정보를 코드에 직접 작성하지 않고 불러올 수 있습니다.

// 2. 필요한 패키지들을 불러옵니다
const express = require('express'); // Node.js 웹 애플리케이션 프레임워크
const mongoose = require('mongoose'); // MongoDB 연결 및 조작을 위한 패키지
const path = require('path'); // 파일 경로 조작을 위한 Node.js 기본 모듈
const cors = require('cors'); // Cross-Origin Resource Sharing 설정을 위한 패키지
const cookieParser = require('cookie-parser');

// 3. 라우터 파일들을 불러옵니다
const postRoutes = require(path.join(__dirname, './routes/postRoutes'));
// 게시글 관련 라우터
const userRoutes = require(path.join(__dirname, './routes/userRoutes'));
// 사용자 관련 라우터


const app = express();

// CORS 설정을 하나로 통합하고 다른 미들웨어보다 먼저 적용
app.use(cors({
  // origin: 'http://localhost:3000', // 프론트엔드 도메인
  // 또는 여러 도메인 허용시
  origin: ['http://localhost:3000', 'https://nfe-1-1-3-tech-log.vercel.app/'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB 연결 설정
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// 다른 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 라우트 설정
app.use('/posts', postRoutes);
app.use('/user', userRoutes);


module.exports = app;