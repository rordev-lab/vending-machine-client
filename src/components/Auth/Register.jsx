import React, { useState } from 'react';

import registerValidator from '../../utils/registerValidator';
import { registerValidationFunc } from '../../utils/formValidator';
import Input from '../Common/Input';
import { register } from '../../services';
import { showError, showSuccess } from '../../utils/toast';

const initialStates = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
};

const Register = (props) => {
  const { history } = props;
  // States
  const [inputs, setInputs] = useState(initialStates);
  /*
  -----------------------------------
    Function to manage input states
  ----------------------------------
  */
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  /*
  -----------------------------------
    Function to manage select option 
  ----------------------------------
  */
  const onSelected = (event) => {
    const { value } = event.target;
    setInputs({
      ...inputs,
      role: value,
    });
  };

  /*
  -----------------------------------
    Function to manage registration
  ----------------------------------
  */
  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, role } = inputs;
    if (!registerValidator(username, email, password, confirmPassword, role))
      return;
    const data = {
      username,
      email,
      password,
      password_confirmation: confirmPassword,
      role,
    };

    const result = await register(data);
    if (result.status === 'success') {
      showSuccess('Registration Successful');
      setInputs(initialStates);
      history.push('/login');
    } else {
      showError(result.errors.full_messages[0]);
    }
  };

  const { username, email, password, confirmPassword, role } = inputs;

  let validObj = registerValidationFunc(
    username,
    email,
    password,
    confirmPassword,
    role
  );

  return (
    <div className='container'>
      <div className='row space-top'>
        <div className='col-md-12'>
          <h1>Register</h1>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className='row space-top'>
          <div className='col-md-4'>
            <Input
              type='text'
              name='username'
              label='Username'
              placeholder='Enter username'
              value={username}
              onChange={onChange}
              valid={validObj.validUsername}
            />
            <Input
              type='text'
              name='email'
              label='E-mail'
              placeholder='Enter e-mail'
              value={email}
              onChange={onChange}
              valid={validObj.validEmail}
            />
            <Input
              type='password'
              name='password'
              label='Password'
              placeholder='Enter password'
              value={password}
              onChange={onChange}
              valid={validObj.validPassword}
            />
            <Input
              type='password'
              name='confirmPassword'
              label='Confirm Password'
              placeholder='Enter your password again'
              value={confirmPassword}
              onChange={onChange}
              valid={validObj.validConfirmPassword}
            />{' '}
            <div className='form-group'>
              <label className='form-control-label' htmlFor={'Line Type'}>
                User Role
              </label>
              <select
                value={role}
                onChange={onSelected}
                className={`form-control`}
              >
                <option value=''>select</option>
                <option value='seller'>Seller</option>
                <option value='buyer'>Buyer</option>
              </select>
            </div>
            <input
              type='submit'
              className='btn btn-primary mt-3'
              value='Register'
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
