export default function useLogin() {
  const inputs = [
    {
      label: '아이디',
      placeholder: '아이디를 입력하세요',
      onChange: () => console.log('아이디'),
      width: '50rem',
    },
    {
      label: '비밀번호',
      placeholder: '비밀번호를 입력하세요',
      onChange: () => console.log('비번'),
      width: '50rem',
    },
  ];
  return { inputs };
}
