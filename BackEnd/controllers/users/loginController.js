const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const secretKey = process.env.SECRET_KEY;
const TOKEN_EXPIRE_TIME = '10m';
const COOKIE_EXPIRE_TIME = 10 * 60 * 1000;

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 입력값 검증
    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        success: false,
        errorCode: 'FIELD_EMPTY',
        errors: { message: '아이디와 비밀번호를 입력해주세요.' },
      });
    }

    // 사용자 검색
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(404).json({
        status: 404,
        success: false,
        errorCode: 'USER_NOT_FOUND',
        errors: { message: '존재하지 않는 사용자입니다', field: 'username' },
      });
    }

    // 비밀번호 검증
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      userDoc.password,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 401,
        success: false,
        errorCode: 'PASSWORD_INCORRECT',
        errors: {
          message: '비밀번호가 일치하지 않습니다.',
          field: 'password',
        },
      });
    }

    // JWT 토큰 생성
    const payload = { id: userDoc._id, username: userDoc.username };
    const token = jwt.sign(payload, secretKey, {
      expiresIn: TOKEN_EXPIRE_TIME,
    });

    // 쿠키 옵션 설정
    // loginController.js의 cookieOptions 부분 수정
    const cookieOptions = {
      httpOnly: true,
      secure: true, // localhost에서도 true로 설정
      sameSite: 'none', // cross-origin 요청 허용을 위해 'none'으로 설정
      maxAge: COOKIE_EXPIRE_TIME,
      path: '/',
    };
    // const cookieOptions = {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    //   maxAge: COOKIE_EXPIRE_TIME,
    //   path: '/',
    // };

    // 응답 전송
    return res.cookie('token', token, cookieOptions).json({
      status: 200,
      success: true,
      message: '로그인 성공',
      successCode: 'LOGIN_SUCCESS',
      data: { id: userDoc._id, username: userDoc.username },
    });
  } catch (e) {
    console.log('로그인 에러: ', e);
    return res.status(500).json({
      status: 500,
      success: false,
      errorCode: 'SERVER_ERROR',
      errors: {
        message: '서버 에러가 발생했습니다.',
        ...(process.env.NODE_ENV !== 'production' && { error: e.message }),
      },
    });
  }
};
