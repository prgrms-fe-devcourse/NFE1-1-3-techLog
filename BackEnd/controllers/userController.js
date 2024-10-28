const path = require('path');
const User = require(path.join(__dirname, '../models/user'));
const bcryptjs = require('bcryptjs');

// -------------------유효성 검사 객체---------------------------
const validators = {
  // 아이디 유효성 검사 객체
  validateUsername: username => {
    if (!username) {
      return {
        isValid: false,
        message: 'id는 필수 입력 사항입니다.',
        field: 'username',
      };
    }
    const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/;
    if (!usernameRegex.test(username)) {
      return {
        isValid: false,
        message: 'id는 6~18자의 영문 대/소문자, 숫자를 포함해야 합니다.',
        field: 'username',
      };
    }
    return { isValid: true };
  },

  // 비밀번호 유효성 검사 객체
  validatePassword: password => {
    if (!password) {
      return {
        isValid: false,
        message: 'password는 필수 입력 사항입니다.',
        field: 'password',
      };
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,18}$/;
    if (!passwordRegex.test(password)) {
      return {
        isValid: false,
        message:
          '비밀번호는 10~18자의 영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.',
        field: 'password',
      };
    }
    return { isValid: true };
  },
};

// -------------------회원가입 로직---------------------------
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
        message: '이미 등록된 회원입니다.',
        field: 'username',
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
      message: '회원가입이 성공적으로 완료되었습니다.',
      user: userDoc,
    });
  } catch (e) {
    res.status(500).json({
      message: '서버 에러 발생',
      error: e,
    });
  }
};

// -------------------username 중복확인 로직-------------------
exports.idCheckUser = async (req, res) => {
  const { username } = req.body;

  const usernameValidation = validators.validateUsername(username);
  if (!usernameValidation.isValid) {
    return res.status(400).json(usernameValidation);
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: '사용중인 id입니다.',
        field: 'username',
      });
    } else {
      return res.status(200).json({
        message: '사용 가능한 id입니다.',
      });
    }
  } catch (e) {
    res.status(500).json({
      message: '서버 에러 발생',
      error: e.message,
    });
  }
};

// -------------------로그인 로직-------------------
// TODO
