import { showError } from './toast';

const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
/*
--------------------------
  Registration fields validator
---------------------------
 */
const registerValidator = (
  username,
  email,
  password,
  confirmPassword,
  role
) => {
  console.log('role', role);
  if (username.length < 3 || username.trim() === '') {
    showError('Username must be at least 3 characters long');
    return false;
  }
  if (!emailRegex.test(email) || email === '') {
    showError('Please provide a correct email address');
    return false;
  }

  if (password.length < 8 || password === '') {
    showError('Password must be at least 8 characters long');
    return false;
  }
  if (password !== confirmPassword) {
    showError('Passwords do not match');
    return false;
  }
  if (role === '') {
    showError('Role is required');
    return false;
  }

  return true;
};

export default registerValidator;
