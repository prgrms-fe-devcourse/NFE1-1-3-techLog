const path = require('path');
const Post = require(path.join(__dirname, '../../models/post'));

const mongoose = require('mongoose');

exports.deletePost = async (req, res) => {
  try {
    console.log('Delete request received for ID:', req.params.id);

    // 1. ID 형식 유효성 검사
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: '유효하지 않은 게시글 ID입니다.',
      });
    }

    // 2. 게시글 존재 여부 확인
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '해당 게시글을 찾을 수 없습니다.',
      });
    }

    // 3. 작성자 권한 확인
    if (post.authorId !== req.cookies.token) {
      return res.status(403).json({
        success: false,
        message: '본인이 작성한 게시글만 삭제할 수 있습니다.',
      });
    }

    // 4. 게시글 삭제 실행
    await Post.findByIdAndDelete(req.params.id);

    // 5. 삭제 성공 응답
    return res.status(200).json({
      success: true,
      message: '게시글이 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    console.error('Delete Post Error:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
      error: error.message,
    });
  }
};
