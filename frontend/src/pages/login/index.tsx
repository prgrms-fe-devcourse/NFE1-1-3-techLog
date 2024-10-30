import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, UnderlinedText } from './index.styles';
import InputWithLabel from '../../components/Input';
import AuthButton from '../../components/Button/AuthButton';
import PATH from '../../constants/path';
import useLogin from '../../hooks/useLogin';

export default function Login() {
  const navigate = useNavigate();
  const { inputs, password, username, mutateLogin } = useLogin();

  return (
    <Container>
      <h1>Tech log</h1>
      <h2>개발자들을 위한 기술 면접 공유 플랫폼</h2>
      {inputs.map(input => (
        <InputWithLabel {...input} />
      ))}
      <p>
        아직 계정이 없으신가요?{' '}
        <UnderlinedText
          onClick={() => {
            navigate(PATH.SIGNUP);
          }}
        >
          회원가입하러 가기
        </UnderlinedText>
      </p>
      <AuthButton
        title="로그인"
        onClick={() => {
          console.log('확인');
          mutateLogin.mutate({ username, password });
        }}
        width="50rem"
      />
    </Container>
  );
}
