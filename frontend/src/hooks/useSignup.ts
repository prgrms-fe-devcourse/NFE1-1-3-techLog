import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authSignup, authDuplicate } from '../api/auth';
import PATH from '../constants/path';

export default function useSignup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const validateUsername = (inputUsername: string) => {
    const usernameRegex = /^(?=.{6,18}$)[a-z0-9]*[a-z][a-z0-9]*$/;
    return usernameRegex.test(inputUsername);
  };

  const validatePassword = (inputPassword: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,18}$/;
    return passwordRegex.test(inputPassword);
  };

  // 입력 필드 설정
  const inputs = [
    {
      label: '아이디',
      placeholder: '아이디를 입력하세요',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
      width: '50rem',
    },
    {
      label: '비밀번호',
      placeholder: '비밀번호를 입력하세요',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      width: '50rem',
    },
    {
      label: '비밀번호 확인',
      placeholder: '비밀번호를 재입력하세요',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPasswordConfirm(e.target.value),
      width: '50rem',
    },
  ];

  // 회원가입 mutationSignup
  const mutateSignup = useMutation({
    mutationFn: authSignup,
    onSuccess: () => {
      alert('회원가입이 성공적으로 완료되었습니다.');
      navigate(PATH.LOGIN);
    },
    onError: error => {
      if (error.message.includes('400')) {
        if (!validateUsername(username)) {
          alert('id는 필수 입력 사항입니다.');
        } else if (!validatePassword(password)) {
          alert(
            '비밀번호는 10~18자의 영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.'
          );
        } else if (username === '' || password === '') {
          alert('id는 필수 입력 사항입니다.');
        }
      } // 이미 등록된 회원인경우 (구현중)
    },
  });

  // 중복확인 mutationDuplicate
  const mutateDuplicate = useMutation({
    mutationFn: authDuplicate,
    onSuccess: () => {
      alert('사용 가능한 id입니다.');
    },
    onError: error => {
      if (error.message.includes('400')) {
        if (username === '') {
          alert('id는 필수 입력 사항입니다.');
        } else if (!validateUsername(username)) {
          alert('id는 6~18자의 영문 소문자, 숫자를 포함해야 합니다.');
        }
      } else if (error.message.includes('409') && username) {
        alert('사용중인 id입니다.');
      }
    },
  });

  return {
    inputs,
    mutateSignup,
    mutateDuplicate,
    password,
    username,
    passwordConfirm,
  };
}
