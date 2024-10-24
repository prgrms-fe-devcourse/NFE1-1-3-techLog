import React from 'react';
import Container from './index.styles';
import InputWithLabel from '../../components/Input';
import AuthButton from '../../components/Button/AuthButton/index';
import DuplicateButton from '../../components/Button/DuplicateButton/index';
import { styled } from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default function Login() {
  return (
    <Container>
      <h1>
        <img src="/logo.png" alt="logo" />
      </h1>
      <h2>개발자들을 위한 기술 면접 공유 플랫폼</h2>
      <FlexContainer>
        <InputWithLabel
          label="아이디"
          onChange={() => {
            console.log('아이디');
          }}
          width="38rem"
        />
        <DuplicateButton
          title="중복확인"
          onClick={() => {
            console.log('확인');
          }}
          disabled
          width="11rem"
        />
      </FlexContainer>
      <InputWithLabel
        label="비밀번호"
        placeholder="영문,숫자,특수문자 조합 8~16자"
        onChange={() => {
          console.log('비번');
        }}
        width="50rem"
      />
      <InputWithLabel
        label="비밀번호"
        onChange={() => {
          console.log('비번');
        }}
        width="50rem"
      />
      <div />
      <AuthButton
        title="가입완료"
        onClick={() => {
          console.log('확인');
        }}
        disabled
        width="50rem"
      />
    </Container>
  );
}
