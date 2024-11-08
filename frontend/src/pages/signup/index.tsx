import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  FlexContainer,
  InputIDWrapper,
  InputPassWordWrapper,
  ErrorMessage,
  SuccessMessage,
  DuplicateButtonWrapper,
  LogoContainer,
} from './index.styles';
import InputWithLabel from '../../components/Input';
import DuplicateButton from '../../components/Button/DuplicateButton/index';
import SigninButton from '../../components/Button/SignButton';
import { authSignup } from '../../api/auth';
import DevFlipLogo1 from '../../assets/DevFlipLogo1.png';
import DevFlipLogo2 from '../../assets/DevFlipLogo2.png';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isDuplicateCheckClicked, setIsDuplicateCheckClicked] = useState(false);

  const validateUsername = (inputUsername: string) => {
    // 영문 소문자와 숫자를 반드시 포함하고, 6~18자 길이 제한
    const usernameRegex = /^(?=.*[a-z])(?=.*\d)[a-z0-9]{6,18}$/;
    return usernameRegex.test(inputUsername);
  };

  const validatePassword = (inputPassword: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,18}$/;
    return passwordRegex.test(inputPassword);
  };

  const isFormValid = () => {
    return (
      isUsernameValid &&
      isDuplicateCheckClicked &&
      !isUsernameDuplicate &&
      validatePassword(password) &&
      confirmPassword === password
    );
  };

  const handleSubmit = async () => {
    if (isFormValid()) {
      try {
        const response = await authSignup({ username, password });
        if (response.success) {
          console.log('회원가입 성공');
          navigate('/login');
        } else {
          // 서버에서 받은 구체적인 에러 메시지 사용
          setErrors(prevErrors => ({
            ...prevErrors,
            username: response.error || '회원가입에 실패했습니다.',
          }));
        }
      } catch (error: any) {
        // 서버 응답의 에러 메시지 확인
        const errorMessage =
          error.response?.data?.errors?.message ||
          '서버와 통신하는 중 오류가 발생했습니다.';

        setErrors(prevErrors => ({
          ...prevErrors,
          username: errorMessage,
        }));
        console.error('서버 오류:', error);
      }
    } else {
      console.log('유효성 검사 실패');
    }
  };

  useEffect(() => {
    if (username) {
      if (validateUsername(username)) {
        setErrors(prevErrors => ({ ...prevErrors, username: '' }));
        setIsUsernameValid(true);
        setSuccessMessage('');
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          username: '아이디는 영문 소문자, 숫자 조합으로 6~18자여야 합니다.',
        }));
        setIsUsernameValid(false);
        setIsDuplicateCheckClicked(false);
        setSuccessMessage('');
      }
    } else {
      setIsUsernameValid(false);
      setIsDuplicateCheckClicked(false);
      setSuccessMessage('');
    }
  }, [username]);

  useEffect(() => {
    if (password) {
      if (validatePassword(password)) {
        setErrors(prevErrors => ({ ...prevErrors, password: '' }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          password:
            '비밀번호는 영문 대/소문자, 숫자, 특수문자 조합으로 10~18자여야 합니다.',
        }));
      }
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
    }
  }, [confirmPassword, password]);

  const checkDuplicateUsername = () => {
    if (username === 'testuser') {
      setIsUsernameDuplicate(true);
      setErrors(prevErrors => ({
        ...prevErrors,
        username: '사용 중인 아이디입니다.',
      }));
      setSuccessMessage('');
    } else {
      setIsUsernameDuplicate(false);
      setErrors(prevErrors => ({ ...prevErrors, username: '' }));
      setSuccessMessage('사용가능한 아이디입니다.');
    }
    setIsDuplicateCheckClicked(true);
  };

  return (
    <Container>
      <LogoContainer>
        <img src={DevFlipLogo1} alt="DevFlip Logo" />
        <img src={DevFlipLogo2} alt="DevFlip Logo" />
      </LogoContainer>
      <h2>개발자들을 위한 기술 면접 공유 플랫폼</h2>
      <FlexContainer>
        <InputIDWrapper>
          <InputWithLabel
            label="아이디"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            width="38rem"
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </InputIDWrapper>
        <DuplicateButtonWrapper>
          <DuplicateButton
            title="중복확인"
            onClick={checkDuplicateUsername}
            disabled={!isUsernameValid || isDuplicateCheckClicked}
            width="11rem"
          />
        </DuplicateButtonWrapper>
      </FlexContainer>

      <InputPassWordWrapper>
        <InputWithLabel
          label="비밀번호"
          type="password"
          placeholder="대문자, 소문자, 숫자, 특수문자 포함 10~18자"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          width="50rem"
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </InputPassWordWrapper>

      <InputPassWordWrapper>
        <InputWithLabel
          label="비밀번호 확인"
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          width="50rem"
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}
      </InputPassWordWrapper>

      <SigninButton
        title="가입완료"
        onClick={handleSubmit}
        disabled={!isFormValid()}
        width="50rem"
      />
    </Container>
  );
}
