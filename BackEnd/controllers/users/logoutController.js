exports.logoutUser = async (req, res) => {
  const { token } = req.cookies;
  // console.log('req', token);

  try {
    // 쿠키 옵션에서 만료 시간을 0으로 설정해 즉시 쿠키 삭제
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 0, // 만료기간 0으로 설정해 즉시 만료되게 함
      path: '/',
    };

    // 쿠키를 비워 토큰 쿠키 삭제
    return res.cookie('token', '', cookieOptions).json({
      status: 200,
      success: true,
      message: '로그아웃 성공',
      successCode: 'LOGOUT_SUCCESS',
    });
  } catch (e) {
    console.log('로그아웃 에러', e);
    return res.status(500).json({
      status: 500,
      success: false,
      errorCode: 'SERVER_ERROR',
      errors: {
        message: '서버 에러 발생',
        ...(process.env.NODE_ENV !== 'production' && { error: e.message }),
      },
    });
  }
};
