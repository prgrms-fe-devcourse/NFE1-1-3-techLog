const User = require('../../models/user');
const validators = require('./validators');

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
        status: 409,
        success: false,
        errors: { message: '사용중인 id입니다.', field: 'username' },
      });
    }
    return res.status(200).json({
      status: 200,
      success: true,
      message: '사용 가능한 id입니다.',
      username,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      success: false,
      errors: { message: '서버 에러 발생', error: e.message },
    });
  }
};
