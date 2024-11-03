const BASE_URL = process.env.REACT_APP_BASE_URL;

const API = {
  BASE_URL: `${BASE_URL}`,
  LOGIN: `user/login`,
  LOGOUT: 'user/logout',
  SIGNUP: `user/signup`,
  DUPLICATE: `user/idCheck`,
  REGISTER: 'posts/create',
  DELETE: 'posts/delete',
  READ: 'posts/read',
  EDIT: 'posts/update',
  READ_QA_LIST: 'posts/all',
  READ_QA: 'posts/read',
};

export default API;
