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
          'http://localhost:5500',
          'http://127.0.0.1:5500',
          'https://nfe-1-1-3-tech-log.vercel.app',
        ],
        credentials: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        transports: ['websocket', 'polling'],
      },
      pingTimeout: 60000,
      pingInterval: 25000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupEventHandlers();
    this.setupRoomCleaner();
    return this.io;
  }

  setupRoomCleaner() {
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
          console.log('Joining post with ID:', postId);
          const cleanPostId = postId.replace(/"/g, '');
          const roomName = `post_${cleanPostId}`;

          // 이전 방에서 나가기
          Object.keys(socket.rooms).forEach(room => {
            if (room.startsWith('post_')) {
              socket.leave(room);
              console.log(`Left previous room: ${room}`);
            }
          });

          socket.join(roomName);
          console.log(`Client ${socket.id} joined ${roomName}`);

          // 오름차순 정렬로 변경 (-1 → 1)
          const comments = await Comment.find({ postId: cleanPostId }).sort({
            createdAt: 1,
          }); // 오래된 순으로 정렬

          console.log('Found comments:', comments);

          // 댓글 데이터 가공
          const processedComments = comments.map(comment => ({
            _id: comment._id,
            content: comment.content,
            userId: comment.userId,
            createdAt: comment.createdAt,
          }));

          socket.emit('load_comments', processedComments);

          console.log('Sent processed comments:', processedComments);
        } catch (error) {
          console.error('Error in join_post:', error);
          socket.emit('comment_error', {
            message: '댓글을 불러오는 중 오류가 발생했습니다.',
            error: error.message,
          });
        }
      });

      // 방 나가기 처리
      socket.on('leave_post', postId => {
        try {
          console.log('Leaving post:', postId);
          const roomName = `post_${postId}`;
          socket.leave(roomName);
          console.log(`Client ${socket.id} left ${roomName}`);
        } catch (error) {
          console.error('Error in leave_post:', error);
        }
      });

      // 새 댓글 작성 처리
      socket.on('new_comment', async data => {
        try {
          console.log('Received new comment data:', data);

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

          // ObjectId 검증은 postId에만 적용
          if (!mongoose.Types.ObjectId.isValid(commentData.postId)) {
            throw new Error('유효하지 않은 게시글 ID입니다.');
          }

          // 댓글 생성
          console.log('Creating new comment with data:', commentData);
          const comment = await Comment.create({
            userId: commentData.userId,
            postId: commentData.postId,
            content: commentData.content,
          });

          console.log('Created comment:', comment);

          // 응답 데이터 준비
          const responseComment = {
            _id: comment._id,
            content: comment.content,
            userId: comment.userId,
            createdAt: comment.createdAt,
          };

          const roomName = `post_${commentData.postId}`;

          // 댓글 생성 확인 메시지 송신자에게 전송
          socket.emit('comment_confirmed', {
            message: '댓글이 성공적으로 작성되었습니다.',
            comment: responseComment,
          });

          // 모든 클라이언트에게 새 댓글 전송
          this.io.to(roomName).emit('comment_added', responseComment);

          console.log(
            'Comment successfully processed and broadcast to room:',
            roomName
          );
        } catch (error) {
          console.error('Error in new_comment:', error);
          socket.emit('comment_error', {
            message: '댓글 작성 중 오류가 발생했습니다.',
            error: error.message,
          });
        }
      });

      // 연결 해제 처리
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        Object.keys(socket.rooms).forEach(room => {
          if (room.startsWith('post_')) {
            socket.leave(room);
            console.log(`Left room on disconnect: ${room}`);
          }
        });
      });
    });
  }
}

module.exports = SocketServer;
