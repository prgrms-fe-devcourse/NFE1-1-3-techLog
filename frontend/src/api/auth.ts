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
  const { data } = await apiClient.post(API.SIGNUP, userSignUpData);
  return data;
};

export const authDuplicate = async (userDuplicateData: {
  username: string;
}) => {
  const { data } = await apiClient.post(API.DUPLICATE, userDuplicateData);
  return data;
};

export const authLogout = async () => {
  const { data } = await apiClient.post(API.LOGOUT);
  return data;
};
