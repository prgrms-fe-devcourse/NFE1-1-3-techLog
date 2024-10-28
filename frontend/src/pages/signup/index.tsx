import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, FlexContainer, InputIDWrapper, InputPassWordWrapper, ErrorMessage, DuplicateButtonWrapper } from './index.styles';
import InputWithLabel from '../../components/Input';
import AuthButton from '../../components/Button/AuthButton/index';
import DuplicateButton from '../../components/Button/DuplicateButton/index';
import { styled } from 'styled-components';

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
  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isDuplicateCheckClicked, setIsDuplicateCheckClicked] = useState(false);

  const validateUsername = (username: string) => {
    const usernameRegex = /^[A-Za-z0-9]{1,10}$/;
    return usernameRegex.test(username);
  };

  useEffect(() => {
    // 아이디 유효성 검사
    if (validateUsername(username)) {
      setErrors(prevErrors => ({ ...prevErrors, username: '' }));
      setIsUsernameValid(true);
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        username: '아이디는 영문과 숫자 조합으로 10자 이내여야 합니다.',
      }));
      setIsUsernameValid(false);
    }
  }, [username]);

  const validate = () => {
    let newErrors = { username: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!validateUsername(username)) {
      newErrors.username =
        '아이디는 영문과 숫자 조합으로 10자 이내여야 합니다.';
      isValid = false;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        '비밀번호는 영문, 숫자, 특수문자를 포함하여 8~16자이어야 합니다.';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const checkDuplicateUsername = () => {
    // 서버에 중복확인 요청을 보낸다고 가정
    if (username === 'testuser') {
      // 예시: 'testuser'가 중복된 아이디
      setIsUsernameDuplicate(true);
      setErrors(prevErrors => ({
        ...prevErrors,
        username: '존재하고 있는 아이디입니다.',
      }));
    } else {
      setIsUsernameDuplicate(false);
      setErrors(prevErrors => ({ ...prevErrors, username: '' }));
    }
    setIsDuplicateCheckClicked(true); // 중복 확인 버튼을 다시 누를 수 없게 설정
  };

  const handleSubmit = () => {
    if (validate() && !isUsernameDuplicate) {
      console.log('유효성 검사 통과');
      navigate('/login');
    } else {
      console.log('유효성 검사 실패');
    }
  };

  return (
    <Container>
      <h1>
        <img src="/logo.png" alt="logo" />
      </h1>
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
          placeholder="영문,숫자,특수문자 조합 8~16자"
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

      <AuthButton title="가입완료" onClick={handleSubmit} width="50rem" />
    </Container>
  );
}