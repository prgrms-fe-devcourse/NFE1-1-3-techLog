// websocket/websocketServer.js
const WebSocket = require('ws');
const Comment = require('../models/comment');

class WebSocketServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map();
    this.connectionCount = 0;

    this.wss.on('connection', (ws, req) => {
      this.connectionCount++;
      console.log(
        `새로운 WebSocket 연결 (현재 연결 수: ${this.connectionCount})`,
      );

      // 연결 시 클라이언트에 웰컴 메시지 전송
      ws.send(
        JSON.stringify({
          message: '웹소켓 서버에 연결되었습니다.',
          timestamp: new Date(),
        }),
      );

      // 메시지 수신 처리
      ws.on('message', async message => {
        try {
          const data = JSON.parse(message);
          console.log('수신된 메시지:', data);
          await this.handleComment(ws, data.content);
        } catch (error) {
          console.error('메시지 처리 중 오류:', error);
          ws.send(
            JSON.stringify({
              error: '메시지 형식이 잘못되었습니다.',
            }),
          );
        }
      });

      // 연결 종료 처리
      ws.on('close', () => {
        this.connectionCount--;
        console.log(
          `WebSocket 연결 종료 (현재 연결 수: ${this.connectionCount})`,
        );
        this.handleClose(ws);
      });

      // 에러 처리
      ws.on('error', error => {
        console.error('WebSocket 에러:', error);
      });
    });
  }

  async handleComment(ws, content) {
    try {
      // 새 댓글 생성
      const comment = new Comment({ content });
      await comment.save();

      // 저장된 댓글을 WebSocket 형식으로 변환하여 전송
      const websocketComment = comment.toWebSocket();

      let deliveredCount = 0;
      this.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(websocketComment));
          deliveredCount++;
        }
      });

      console.log(
        `댓글 브로드캐스트 완료 (전송된 클라이언트 수: ${deliveredCount})`,
      );
      console.log('댓글 저장 및 전송 완료:', websocketComment);
    } catch (error) {
      console.error('댓글 처리 중 오류:', error);
      ws.send(
        JSON.stringify({
          error: '댓글 처리 중 오류가 발생했습니다.',
        }),
      );
    }
  }

  handleClose(ws) {
    // 연결이 끊긴 클라이언트 제거
    for (const [id, client] of this.clients.entries()) {
      if (client === ws) {
        this.clients.delete(id);
        break;
      }
    }
  }

  // 서버 상태 확인용 메서드
  getStatus() {
    return {
      totalConnections: this.connectionCount,
      activeClients: this.clients.size,
    };
  }
}

module.exports = WebSocketServer;
