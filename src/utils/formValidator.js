/*
----------------------------------------
  Function to validate registration form
-----------------------------------------
 */
const registerValidationFunc = (
  username,
  email,
  password,
  confirmPassword,
  role
) => {
  let validUsername = (() => {
    if (username.length > 3 && username.trim() !== '') {
      return true;
    }
    return false;
  })();

  let validEmail = (() => {
    let mailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let testMail = mailRegex.test(email);
    if (testMail && email !== '') {
      return true;
    }
    return false;
  })();

  let validPassword = (() => {
    if (password.length > 7 && password !== '') {
      return true;
    }
    return false;
  })();

  let validConfirmPassword = (() => {
    if (
      confirmPassword.length > 7 &&
      confirmPassword !== '' &&
      confirmPassword === password
    ) {
      return true;
    }
    return false;
  })();

  let validRole = (() => {
    if (role !== '') {
      return true;
    }
    return false;
  })();

  return {
    validEmail,
    validUsername,
    validPassword,
    validConfirmPassword,
    validRole,
  };
};

/*
----------------------------------------
  Function to validate login form
-----------------------------------------
 */
const loginValidationFunc = (email, password) => {
  let validEmail = (() => {
    let mailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let testMail = mailRegex.test(email);
    if (testMail && email !== '') {
      return true;
    }
    return false;
  })();

  let validPassword = (() => {
    if (password.length > 7 && password !== '') {
      return true;
    }
    return false;
  })();

  return {
    validEmail,
    validPassword,
  };
};

/*
----------------------------------------
  Function to validate profile form
-----------------------------------------
 */
const profileValidationFunc = (username, email) => {
  var validForm = false;

  let validUsername = (() => {
    if (username.length > 3 && username.trim() !== '') {
      return true;
    }
    return false;
  })();
  let validEmail = (() => {
    let mailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let testMail = mailRegex.test(email);
    if (testMail && email !== '') {
      return true;
    }
    return false;
  })();

  if (validUsername && validEmail) {
    validForm = true;
  }
  return {
    validUsername,
    validEmail,
    validForm,
  };
};

/*
----------------------------------------
  Function to validate product form
-----------------------------------------
 */

const productValidationFunc = (productName, amountAvailable, cost) => {
  var validForm = false;
  let validProductName = (() => {
    if (productName.length > 2 && productName.trim() !== '') {
      return true;
    }
    return false;
  })();
  let validAmount = (() => {
    if (amountAvailable !== 0 && amountAvailable !== '') {
      return true;
    }
    return false;
  })();
  let validCost = (() => {
    if (cost !== 0 && cost !== '') {
      return true;
    }
    return false;
  })();

  if (validProductName && validCost && validAmount) {
    validForm = true;
  }
  return {
    validProductName,
    validAmount,
    validCost,
    validForm,
  };
};

export {
  registerValidationFunc,
  loginValidationFunc,
  profileValidationFunc,
  productValidationFunc,
};
