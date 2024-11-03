import axios from 'axios';
import API from './config';
import PATH from '../constants/path';

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data.errorCode === 'NEED_TOKEN') {
      // 토큰 만료 또는 인증 실패 시 처리
      alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      localStorage.clear();
      window.location.href = PATH.LOGIN;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
