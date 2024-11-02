const path = require('path');
const app = require(path.join(__dirname, './app'));
const http = require('http');
const WebSocketServer = require('./websocket/websocketServer');

const PORT = process.env.PORT || 8000;

// HTTP 서버 생성
const server = http.createServer(app);

// WebSocket 서버 인스턴스 생성
const wss = new WebSocketServer(server);

// app.locals에 WebSocket 서버 인스턴스 저장
app.locals.wss = wss;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
