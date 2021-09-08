import axios from 'axios';

const register = async (payload) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_URL}/users/`, payload)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

const login = async (payload) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_URL}/users/sign_in`, payload)
    .then((response) => response)
    .catch((error) => error.response);
};

export { register, login };
