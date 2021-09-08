import axios from 'axios';

const buyProduct = async (payload) => {
  var options = {
    headers: {
      'access-token': localStorage.getItem('authToken'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
    params: payload,
  };
  return await axios
    .get(`${process.env.REACT_APP_SERVER_URL}/products/buy`, options)
    .then((response) => response.data)
    .catch((error) => console.log('error in buy product api', error));
};
export { buyProduct };
