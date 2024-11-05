const path = require('path');
const app = require(path.join(__dirname, './app'));
const http = require('http');
const SocketServer = require('./websocket/websocketServer');
const cors = require('cors'); // cors 미들웨어 추가

const PORT = process.env.PORT || 8000;

// CORS 미들웨어 적용
app.use(
  cors({
    origin: [
      'http://127.0.0.1:5500',
      'http://localhost:5500',
      'http://localhost:3000',
    ], // 테스트 HTML 파일이 실행되는 주소 추가
    credentials: true,
  })
);

// HTTP 서버 생성
const server = http.createServer(app);

// Socket.IO 서버 인스턴스 생성
const io = new SocketServer(server);

// app.locals에 Socket.IO 인스턴스 저장
app.locals.io = io;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
