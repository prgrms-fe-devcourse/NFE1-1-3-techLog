import React from 'react';
import Container from './index.styles';
import InputWithLabel from '../../components/Input';
import AuthButton from '../../components/Button/AuthButton';

export default function Login() {
  return (
    <Container>
      <h1>
        <img src="/logo.png" alt="logo" />
      </h1>
      <h2>개발자들을 위한 기술 면접 공유 플랫폼</h2>
      <InputWithLabel
        label="아이디"
        placeholder="아이디를 입력하세요"
        onChange={() => {
          console.log('아이디');
        }}
        width="50rem"
      />
      <InputWithLabel
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        onChange={() => {
          console.log('비번');
        }}
        width="50rem"
      />
      <div />
      <AuthButton
        title="로그인"
        onClick={() => {
          console.log('확인');
        }}
        disabled
        width="50rem"
      />
    </Container>
  );
}
