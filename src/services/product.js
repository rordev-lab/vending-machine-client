import axios from 'axios';

const fetchProducts = async () => {
  var options = {
    headers: {
      'access-token': localStorage.getItem('authToken'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  };
  return await axios
    .get(`${process.env.REACT_APP_SERVER_URL}/products`, options)
    .then((response) => response.data)
    .catch((error) => console.log('error in fetch product api', error));
};

const addProduct = async (payload) => {
  var options = {
    headers: {
      'access-token': localStorage.getItem('authToken'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  };
  return await axios
    .post(`${process.env.REACT_APP_SERVER_URL}/products`, payload, options)
    .then((response) => response)
    .catch((error) => console.log('error in add product api', error));
};

const updateProduct = async (id, payload) => {
  var options = {
    headers: {
      'access-token': localStorage.getItem('authToken'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  };
  return await axios
    .put(`${process.env.REACT_APP_SERVER_URL}/products/${id}`, payload, options)
    .then((response) => response)
    .catch((error) => console.log('error in update product api', error));
};

const deleteProduct = async (id) => {
  var options = {
    headers: {
      'access-token': localStorage.getItem('authToken'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  };
  return await axios
    .delete(`${process.env.REACT_APP_SERVER_URL}/products/${id}`, options)
    .then((response) => response)
    .catch((error) => console.log('error in delete product api', error));
};
export { fetchProducts, addProduct, updateProduct, deleteProduct };
