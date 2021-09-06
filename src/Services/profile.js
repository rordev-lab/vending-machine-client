import axios from 'axios';

const fetchProfile = async () => {
  var options = {
    headers: {
      'access-token': localStorage.getItem('authToken'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  };

  const id = localStorage.getItem('id');
  return await axios
    .get(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, options)
    .then((response) => response.data)
    .catch((error) => error.response);
};

const updateProfile = async (payload) => {
  var options = {
    headers: {
      'access-token': localStorage.getItem('authToken'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  };
  const id = localStorage.getItem('id');
  return await axios
    .put(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, payload, options)
    .then((response) => response)
    .catch((error) => console.log('error in register api', error));
};

const deleteAccount = async () => {
  var options = {
    headers: {
      'access-token': localStorage.getItem('authToken'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  };
  const id = localStorage.getItem('id');
  return await axios
    .delete(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, options)
    .then((response) => response)
    .catch((error) => console.log('error in register api', error));
};

const updateDeposits = async (payload) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_URL}/deposit`, payload)
    .then((response) => response)
    .catch((error) => console.log('error in register api', error));
};

const resetDeposits = async (payload) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_URL}/reset`, payload)
    .then((response) => response)
    .catch((error) => console.log('error in register api', error));
};
export {
  fetchProfile,
  updateDeposits,
  resetDeposits,
  updateProfile,
  deleteAccount,
};
