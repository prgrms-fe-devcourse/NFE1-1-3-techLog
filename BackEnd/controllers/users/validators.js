const validators = {
  // 아이디 유효성 검사 객체
  validateUsername: username => {
    if (!username) {
      return {
        status: 400,
        isValid: false,
        errorCode: 'USERNAME_IS_REQUIRED',
        errors: {
          message: 'id는 필수 입력 사항입니다.',
          field: 'username',
        },
      };
    }
    const usernameRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
    if (!usernameRegex.test(username)) {
      return {
        status: 400,
        isValid: false,
        errorCode: 'USERNAME_VALIDATION_NOT_SATISFIED',
        errors: {
          message: 'id는 6~18자의 영문 소문자, 숫자를 포함해야 합니다.',
          field: 'username',
        },
      };
    }
    return {
      status: 200,
      isValid: true,
      successCode: 'USERNAME_VALIDATION_SATISFIED',
      message: 'id의 조건을 모두 만족합니다.',
    };
  },

  // 비밀번호 유효성 검사 객체
  validatePassword: password => {
    if (!password) {
      return {
        status: 400,
        isValid: false,
        errorCode: 'PASSWORD_IS_REQUIRED',
        errors: {
          message: 'password는 필수 입력 사항입니다.',
          field: 'password',
        },
      };
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,18}$/;
    if (!passwordRegex.test(password)) {
      return {
        status: 400,
        isValid: false,
        errorCode: 'PASSWORD_VALIDATION_NOT_SATISFIED',
        errors: {
          message:
            '비밀번호는 10~18자의 영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.',
          field: 'password',
        },
      };
    }
    return {
      status: 200,
      isValid: true,
      successCode: 'PASSWORD_VALIDATION_SATISFIED',
      message: 'password의 조건을 모두 만족합니다.',
    };
  },
};

module.exports = validators;
