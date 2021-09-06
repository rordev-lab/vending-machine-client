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
    .catch((error) => console.log('error in update profile api', error));
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
    .catch((error) => console.log('error in delete account api', error));
};

const updateDeposits = async (payload) => {
  var options = {
    headers: {
      'access-token': localStorage.getItem('authToken'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  };
  const id = localStorage.getItem('id');
  return await axios
    .put(
      `${process.env.REACT_APP_SERVER_URL}/users/${id}/deposit`,
      payload,
      options
    )
    .then((response) => response)
    .catch((error) => console.log('error in update deposit api', error));
};

const resetDeposits = async (payload) => {
  var options = {
    headers: {
      'access-token': localStorage.getItem('authToken'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  };
  const id = localStorage.getItem('id');
  return await axios
    .put(
      `${process.env.REACT_APP_SERVER_URL}/users/${id}/reset_deposit`,
      {},
      options
    )
    .then((response) => response)
    .catch((error) => console.log('error in reset deposit api', error));
};
export {
  fetchProfile,
  updateDeposits,
  resetDeposits,
  updateProfile,
  deleteAccount,
};
