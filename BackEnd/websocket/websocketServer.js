const { Server } = require('socket.io');
const path = require('path');
const Comment = require(path.join(__dirname, '../models/comment'));
const mongoose = require('mongoose');

class SocketServer {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: [
          'http://localhost:3000',
          'https://nfe-1-1-3-tech-log.vercel.app',
        ],
        credentials: true,
      },
      pingTimeout: 60000, // 60초 후 연결 종료
      pingInterval: 25000, // 25초마다 ping 체크
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupEventHandlers();
    this.setupRoomCleaner();
    return this.io;
  }

  setupRoomCleaner() {
    // 30분마다 빈 방 정리
    setInterval(
      () => {
        const rooms = this.io.sockets.adapter.rooms;
        rooms.forEach((_, room) => {
          if (room.startsWith('post_')) {
            const clientCount =
              this.io.sockets.adapter.rooms.get(room)?.size || 0;
            if (clientCount === 0) {
              console.log(`Cleaning up empty room: ${room}`);
            }
          }
        });
      },
      30 * 60 * 1000
    );
  }

  setupEventHandlers() {
    this.io.on('connection', socket => {
      console.log('Client connected:', socket.id);

      // 연결 에러 처리
      socket.on('connect_error', error => {
        console.error('Connection error:', error);
        socket.emit('connection_error', {
          message: '서버 연결에 문제가 발생했습니다.',
        });
      });

      // 재연결 시도 처리
      socket.on('reconnect_attempt', attemptNumber => {
        console.log(`Reconnection attempt ${attemptNumber}`);
      });

      // 재연결 성공 처리
      socket.on('reconnect', attemptNumber => {
        console.log(`Reconnected after ${attemptNumber} attempts`);
      });

      // 게시글의 댓글방 참여 및 해당 게시글의 모든 댓글 조회
      socket.on('join_post', async postId => {
        try {
          const cleanPostId = postId.replace(/"/g, '');
          const roomName = `post_${cleanPostId}`;

          // 이전 방에서 나가기
          Object.keys(socket.rooms).forEach(room => {
            if (room.startsWith('post_')) {
              socket.leave(room);
            }
          });

          // 새로운 방 참여
          socket.join(roomName);
          console.log(`Client ${socket.id} joined ${roomName}`);

          // 해당 게시글의 모든 댓글 조회
          const comments = await Comment.find({ postId: cleanPostId })
            .populate('userId', 'username')
            .sort({ createdAt: -1 });

          // 방금 참여한 클라이언트에게만 기존 댓글 목록 전송
          socket.emit('load_comments', comments);
        } catch (error) {
          console.error('Error loading comments:', error);
          socket.emit('comment_error', {
            message: '댓글을 불러오는 중 오류가 발생했습니다.',
            error: error.message,
          });
        }
      });

      // 방 나가기 처리
      socket.on('leave_post', postId => {
        try {
          const roomName = `post_${postId}`;
          socket.leave(roomName);
          console.log(`Client ${socket.id} left ${roomName}`);
        } catch (error) {
          console.error('Error leaving room:', error);
        }
      });

      // 새 댓글 작성 처리
      socket.on('new_comment', async data => {
        try {
          console.log('Received new comment:', data);

          const commentData =
            typeof data === 'string' ? JSON.parse(data) : data;

          // 입력 데이터 검증
          if (
            !commentData.userId ||
            !commentData.postId ||
            !commentData.content
          ) {
            throw new Error('필수 입력 항목이 누락되었습니다.');
          }

          // string 타입의 ID도 허용하도록 수정
          const comment = await Comment.create({
            userId: commentData.userId, // string 타입 허용
            postId: commentData.postId, // string 타입 허용
            content: commentData.content,
          });

          // 생성된 댓글에 username 정보 추가
          const populatedComment = await Comment.findById(comment._id).populate(
            'userId',
            'username'
          );

          const roomName = `post_${commentData.postId}`;

          // 댓글 생성 확인 메시지 송신자에게 전송
          socket.emit('comment_confirmed', {
            message: '댓글이 성공적으로 작성되었습니다.',
            comment: populatedComment,
          });

          // 모든 클라이언트에게 새 댓글 전송
          this.io.to(roomName).emit('comment_added', populatedComment);
        } catch (error) {
          console.error('Error processing comment:', error);
          socket.emit('comment_error', {
            message: '댓글 작성 중 오류가 발생했습니다.',
            error: error.message,
          });
        }
      });

      // 연결 해제 처리
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        // 모든 방에서 나가기
        Object.keys(socket.rooms).forEach(room => {
          if (room.startsWith('post_')) {
            socket.leave(room);
          }
        });
      });
    });
  }
}

module.exports = SocketServer;
