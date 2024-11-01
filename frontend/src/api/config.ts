const BASE_URL = process.env.REACT_APP_BASE_URL;

const API = {
  BASE_URL: `${BASE_URL}`,
  LOGIN: `user/login`,
  SIGNUP: `user/signup`,
  DUPLICATE: `user/idCheck`,
};

export default API;
