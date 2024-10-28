const path = require('path');
const User = require(path.join(__dirname, '../models/user'));
const bcryptjs = require('bcryptjs');

// -------------------비밀번호 해시 생성 함수-------------------
const hashPassword = password => {
  const saltRounds = 10; // 해시 생성 시 사용되는 salt
  return bcryptjs.hashSync(password, saltRounds);
};

// -------------------회원가입 로직-------------------
exports.signupUser = async (req, res) => {
  const { username, password } = req.body;

  // 필수 필드 체크
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'id와 password는 필수 입력 사항 입니다.' });
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
    const hashedPassword = hashPassword(password);
    const userDoc = await User.create({
      username,
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

  if (!username || typeof username !== 'string') {
    return res.status(400).json({
      message: 'id는 필수 입력 사항입니다.',
      field: 'username',
    });
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
