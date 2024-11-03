import API from './config';
import apiClient from '.';

export const authLogin = async (userLoginData: {
  username: string;
  password: string;
}) => {
  const { data } = await apiClient.post(API.LOGIN, userLoginData);
  return data;
};

export const authSignup = async (userSignUpData: {
  username: string;
  password: string;
}) => {
  try {
    const fullUrl = `${API.BASE_URL}/${API.SIGNUP}`;

    const { data } = await apiClient.post(fullUrl, userSignUpData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return { success: true, data };
  } catch (error: any) {
    if (error.response) {
      console.error('Signup Error Response:', error.response.data);
      return {
        success: false,
        error: error.response.data.message || '회원가입에 실패했습니다.',
        status: error.response.status,
      };
    }

    if (error.request) {
      console.error('No Response:', error.request);
      return {
        success: false,
        error: '서버에서 응답이 없습니다.',
        status: 503,
      };
    }

    console.error('Error Config:', error.message);
    return {
      success: false,
      error: '요청 중 오류가 발생했습니다.',
      status: 500,
    };
  }
};

export const authDuplicate = async (userDuplicateData: {
  username: string;
}) => {
  const { data } = await apiClient.post(API.DUPLICATE, userDuplicateData);
  return data;
};

export const authLogout = async () => {};
