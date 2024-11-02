const { Server } = require('socket.io');
const path = require('path');
const Comment = require(path.join(__dirname, '../models/comment'));

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
    });

    this.setupEventHandlers();
    return this.io;
  }

  setupEventHandlers() {
    this.io.on('connection', socket => {
      console.log('Client connected:', socket.id);

      socket.on('join_post', postId => {
        const cleanPostId = postId.replace(/"/g, '');
        const roomName = `post_${cleanPostId}`;
        socket.join(roomName);
        console.log(`Client ${socket.id} joined ${roomName}`);
      });

      socket.on('new_comment', async data => {
        try {
          console.log('Received new comment:', data);

          const commentData =
            typeof data === 'string' ? JSON.parse(data) : data;

          const comment = await Comment.create({
            userId: commentData.userId,
            postId: commentData.postId,
            content: commentData.content,
          });

          const roomName = `post_${commentData.postId}`;

          // 자신을 제외한 다른 클라이언트들에게만 전송
          socket.broadcast.to(roomName).emit('comment_added', comment);
        } catch (error) {
          console.error('Error processing comment:', error);
          socket.emit('comment_error', { message: error.message });
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }
}

module.exports = SocketServer;
