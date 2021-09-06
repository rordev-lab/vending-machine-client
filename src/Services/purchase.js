import axios from 'axios';

const buyProduct = async (payload) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_URL}/buy`, payload)
    .then((response) => response)
    .catch((error) => console.log('error in register api', error));
};
export { buyProduct };
