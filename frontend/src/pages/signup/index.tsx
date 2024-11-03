import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  FlexContainer,
  InputIDWrapper,
  InputPassWordWrapper,
  ErrorMessage,
<<<<<<< HEAD
  DuplicateButtonWrapper
=======
  SuccessMessage,
  DuplicateButtonWrapper,
>>>>>>> 8f9b38b1f08cfb5a2bc9dbbf590c4f01a06ccf81
} from './index.styles';
import InputWithLabel from '../../components/Input';
import DuplicateButton from '../../components/Button/DuplicateButton/index';
import SigninButton from '../../components/Button/SignButton';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isDuplicateCheckClicked, setIsDuplicateCheckClicked] = useState(false);

  const validateUsername = (inputUsername: string) => {
    const usernameRegex = /^(?=.{6,18}$)[a-z0-9]*[a-z][a-z0-9]*$/;
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

  const handleSubmit = () => {
    if (isFormValid()) {
      console.log('유효성 검사 통과');
      navigate('/login');
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
          username: '아이디는 소문자 6자 이상 18자 이내여야 합니다.'
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
            '비밀번호는 대소문자, 숫자, 특수문자를 포함해 10~18자이어야 합니다.'
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
        username: '존재하고 있는 아이디입니다.'
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
      <h1>Tech log</h1>
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
