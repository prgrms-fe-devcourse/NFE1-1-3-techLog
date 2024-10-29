// // middleware/auth.js
// const verifyToken = (req, res, next) => {
//     // 헤더에서 토큰 가져오기
//     const token = req.header('Authorization');
//     // 토큰이 없는 경우
//     if (!token) {
//         return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
//     }
//     try {
//         // 테스트용이므로 토큰이 존재하기만 하면 통과
//         // 실제 환경에서는 JWT 등을 사용하여 토큰 검증 필요
//         if (token.startsWith('Bearer ')) {
//             // Bearer 토큰에서 실제 토큰 값만 추출
//             req.token = token.slice(7);
//             next();
//         } else {
//             throw new Error('잘못된 토큰 형식입니다.');
//         }
//     } catch (err) {
//         res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
//     }
// };
// module.exports = verifyToken;

// middleware/auth.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    // 쿠키 또는 헤더에서 토큰 가져오기 (쿠키 우선)
    const token =
      req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: '인증 토큰이 필요합니다.',
      });
    }

    // JWT 토큰 검증
    const decoded = jwt.verify(token, secretKey);

    // 검증된 사용자 정보를 request 객체에 저장
    req.user = {
      id: decoded.id,
      username: decoded.username, // 필요한 경우 추가
    };
    next();
  } catch (err) {
    // 토큰 만료 또는 유효하지 않은 경우
    const errorResponse = {
      status: 401,
      success: false,
      message:
        err.name === 'TokenExpiredError'
          ? '토큰이 만료되었습니다.'
          : '유효하지 않은 토큰입니다.',
    };

    // 개발 환경에서만 에러 메시지 표시
    if (process.env.NODE_ENV !== 'production') {
      errorResponse.error = err.message;
    }

    res.status(401).json(errorResponse);
  }
};

module.exports = verifyToken;
