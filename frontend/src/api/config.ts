const BASE_URL = process.env.REACT_APP_BASE_URL;

const API = {
  BASE_URL: `${BASE_URL}`,
  LOGIN: `user/login`,
  REGISTER: 'posts/create',
  DELETE: 'posts/delete',
  READ: 'posts/read',
  EDIT: 'posts/update',
  READ_ALL: 'posts/all',
};

export default API;
