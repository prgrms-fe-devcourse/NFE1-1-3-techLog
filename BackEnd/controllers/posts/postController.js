const path = require('path');
const Post = require(path.join(__dirname, '../../models/post'));

exports.createPost = async (req, res) => {
  const { title, category, shortAnswer, detailedAnswer } = req.body;

  try {
    console.log('Auth 미들웨어에서 받은 user 정보:', req.user);
    console.log('게시글 작성자 ID:', req.user.id);
    console.log('받은 게시글 데이터:', { title, category, shortAnswer, detailedAnswer });

        // 필수 입력값 검증
        if (!title || !category || !shortAnswer) {
          return res.status(400).json({
            status: 400,
            success: false,
            errorCode: 'FIELD_EMPTY',
            errors: { message: '필수 항목을 모두 입력해주세요.' },
          });
        }

    // 게시글 생성
    const post = new Post({
      title,
      category,
      shortAnswer,
      detailedAnswer,
      authorId: req.user.id  // auth 미들웨어에서 설정된 사용자 ID
    });

    const savedPost = await post.save();

    // 쿠키에서 토큰 확인
    if (!req.cookies.token) {
      return res.status(401).json({
        status: 401,
        success: false,
        errorCode: 'TOKEN_NOT_FOUND',
        errors: { message: '토큰이 존재하지 않습니다.' },
      });
    }

   // 응답 전송
    return res.status(201).json({
      status: 201,
      success: true,
      message: '게시글이 성공적으로 생성되었습니다.',
      successCode: 'POST_CREATE_SUCCESS',
      data: savedPost
    });

  } catch (error) {
    console.error('게시글 생성 에러:', error);
    return res.status(500).json({
      status: 500,
      success: false,
      errorCode: 'SERVER_ERROR',
      errors: {
        message: '서버 에러가 발생했습니다.',
        ...(process.env.NODE_ENV !== 'production' && { error: error.message }),
      },
    });
  }
};