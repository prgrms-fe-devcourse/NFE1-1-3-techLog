import { useMutation } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
import { authLogin } from '../api/auth';
import useInput from './useInput';
// import PATH from '../constants/path';

export default function useLogin() {
  // const navigate = useNavigate();
  const [password, onChangePassword] = useInput('');
  const [username, onChangeUsername] = useInput('');

  const inputs = [
    {
      label: '아이디',
      placeholder: '아이디를 입력하세요',
      onChange: onChangeUsername,
      width: '50rem',
    },
    {
      label: '비밀번호',
      placeholder: '비밀번호를 입력하세요',
      onChange: onChangePassword,
      width: '50rem',
    },
  ];
  const mutateLogin = useMutation({
    mutationFn: authLogin,
    onSuccess: data => {
      localStorage.setItem('username', data.data.username);
      // navigate(PATH.MAIN);
    },
    onError: error => {
      if (error.message.includes('401'))
        alert('아이디 또는 비밀번호를 확인해주세요.');
    },
  });

  return { inputs, mutateLogin, password, username };
}
