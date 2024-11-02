import API from './config';
import apiClient from '.';

export const authLogin = async (userLoginData: {
  username: string;
  password: string;
}) => {
  const { data } = await apiClient.post(API.LOGIN, userLoginData);
  return data;
};

export const authLogout = async () => {
  const { data } = await apiClient.post(API.LOGOUT);
  return data;
};
