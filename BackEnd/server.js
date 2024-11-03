const path = require('path');
const app = require(path.join(__dirname, './app'));
const http = require('http');
const SocketServer = require('./websocket/websocketServer');

const PORT = process.env.PORT || 8000;

// HTTP 서버 생성
const server = http.createServer(app);

// Socket.IO 서버 인스턴스 생성
const io = new SocketServer(server);

// app.locals에 Socket.IO 인스턴스 저장
app.locals.io = io;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
