import React, { useEffect, useState } from 'react';

import Input from '../Common/Input';
import loginValidator from '../../utils/loginValidator';
import { loginValidationFunc } from '../../utils/formValidator';
import { login } from '../../Services';
import { isUserAuthenticated } from '../../utils/auth';
import { showError, showSuccess } from '../../utils/toast';

const initialStates = {
  email: '',
  password: '',
};

const Login = (props) => {
  const { history } = props;
  // states
  const [inputs, setInputs] = useState(initialStates);

  useEffect(() => {
    if (isUserAuthenticated()) {
      props.history.push('/');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  -------------------------
    Function to mange login
  -------------------------
  */
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputs;
    if (!loginValidator(email, password)) return;
    const { data, headers } = await login(inputs);
    console.log('sss', data);
    if (data && !data.success) {
      showError(data.errors[0]);
    } else {
      if (data.data) {
        const { role = '', id = '' } = data.data;
        showSuccess('Login Successful');
        localStorage.setItem('role', role);
        localStorage.setItem('id', id);
        localStorage.setItem('authToken', headers['access-token']);
        localStorage.setItem('uid', headers['uid']);
        localStorage.setItem('client', headers['client']);
        history.push('/');
      }
    }
  };

  const { email, password } = inputs;
  let validObj = loginValidationFunc(email, password);
  return (
    <div className='container'>
      <div className='row space-top'>
        <div className='col-md-12'>
          <h1>Login</h1>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className='row space-top'>
          <div className='col-md-4'>
            <Input
              type='text'
              name='email'
              label='email'
              placeholder='Enter email'
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
            <input
              type='submit'
              className='btn btn-primary mt-3'
              value='Login'
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
