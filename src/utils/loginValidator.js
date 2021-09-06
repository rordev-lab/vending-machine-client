import { showError } from './toast';
const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
/*
--------------------------
  Login fields validator
---------------------------
 */
const loginValidator = (email, password) => {
  if (!emailRegex.test(email) || email === '') {
    showError('Please provide a correct email address');
    return false;
  }
  if (password.length < 8 || password === '') {
    showError('Password must be at least 8 characters long');
    return false;
  }

  return true;
};

export default loginValidator;
