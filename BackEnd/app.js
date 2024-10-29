// 1. 환경변수 설정
require('dotenv').config();
// .env 파일에 있는 환경변수들을 process.env로 불러옵니다.
// 예: process.env.MONGODB_URI처럼 민감한 정보를 코드에 직접 작성하지 않고 불러올 수 있습니다.

// 2. 필요한 패키지들을 불러옵니다
const express = require('express'); // Node.js 웹 애플리케이션 프레임워크
const mongoose = require('mongoose'); // MongoDB 연결 및 조작을 위한 패키지
const path = require('path'); // 파일 경로 조작을 위한 Node.js 기본 모듈
const cors = require('cors'); // Cross-Origin Resource Sharing 설정을 위한 패키지

// 3. 라우터 파일들을 불러옵니다
const postRoutes = require(path.join(__dirname, './routes/postRoutes'));
// 게시글 관련 라우터
const userRoutes = require(path.join(__dirname, './routes/userRoutes'));
// 사용자 관련 라우터

// 4. Express 애플리케이션 인스턴스를 생성합니다
const app = express();

// 5. MongoDB 연결 설정
mongoose
  .connect(process.env.MONGODB_URI) // .env 파일에 정의된 MongoDB URI로 연결
  .then(() => {
    console.log('MongoDB connected'); // 연결 성공 시 로그 출력
  })
  .catch(err => {
    console.error('MongoDB connection error:', err); // 연결 실패 시 에러 로그 출력
  });

// 6. 미들웨어 설정
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true })); // CORS 설정 - 다른 도메인에서의 API 요청 허용
app.use(express.json()); // JSON 형식의 요청 본문 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 형식의 요청 본문 파싱

// 7. 라우트 설정
app.use('/posts', postRoutes); // /posts로 시작하는 요청을 postRoutes로 처리
app.use('/user', userRoutes); // /user로 시작하는 요청을 userRoutes로 처리

// 8. app 객체를 모듈로 내보냅니다
module.exports = app;
