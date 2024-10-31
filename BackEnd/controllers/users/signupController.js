const bcryptjs = require('bcryptjs');
const User = require('../../models/user');
const validators = require('./validators');

exports.signupUser = async (req, res) => {
  const { username, password } = req.body;

  const usernameValidation = validators.validateUsername(username);
  if (!usernameValidation.isValid) {
    return res.status(400).json(usernameValidation);
  }

  const passwordValidation = validators.validatePassword(password);
  if (!passwordValidation.isValid) {
    return res.status(400).json(passwordValidation);
  }

  try {
    // 등록된 회원인지 확인
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        success: false,
        errorCode: 'ALREADY_REGISTERED_USERNAME',
        errors: {
          message: '이미 등록된 회원입니다.',
          field: 'username',
        },
      });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcryptjs.hash(password, 10);
    const userDoc = await User.create({
      username: username.trim(),
      password: hashedPassword,
    });

    // 회원가입 성공할 경우 사용자 데이터 반환
    res.status(201).json({
      status: 201,
      success: true,
      successCode: 'SIGNUP_SUCCESS',
      message: '회원가입이 성공적으로 완료되었습니다.',
      data: {
        user: userDoc,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      success: false,
      errorCode: 'SERVER_ERROR',
      errors: {
        message: '서버 에러 발생',
        error: e,
      },
    });
  }
};
