import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSync, faTrash } from '@fortawesome/free-solid-svg-icons';

import { profileValidationFunc } from '../../utils/formValidator';
import Input from '../Common/Input';
import { isSellerUser } from '../../utils/auth';

const ProfileForm = ({
  onChange,
  onSubmit,
  inputs,
  isEdit,
  onReset,
  onEditProfile,
  onDeleteAccount,
}) => {
  const { username, email } = inputs;

  let validObj = profileValidationFunc(username, email);

  return (
    <div className='container'>
      <div className='row space-top'>
        <div className='col-md-2'>
          <h1>Profile</h1>
        </div>
        <div className='col-md-10'>
          <button
            className='btn btn-danger btn-sm float-right'
            onClick={() => onEditProfile()}
          >
            <FontAwesomeIcon icon={faEdit} /> Edit Profile
          </button>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className='row space-top'>
          <div className='col-md-6'>
            <Input
              type='text'
              name='username'
              label='User name'
              placeholder='Enter username'
              value={username}
              onChange={onChange}
              readOnly={isEdit ? false : true}
              valid={validObj.validUsername}
            />
            <Input
              type='text'
              readOnly={true}
              name='email'
              label='email'
              placeholder='Enter email'
              value={email}
              onChange={onChange}
              valid={validObj.validEmail}
            />
          </div>{' '}
          {!isSellerUser() ? (
            <>
              <div className='col-md-12'>
                <p className='mt-2'>
                  <b>Balance is .00</b>
                </p>
                <p className='mt-2'>
                  <div className='d-flex'>
                    <span>
                      <b>Deposits :- </b>
                    </span>
                    {!isEdit ? (
                      <>
                        <span>
                          <button
                            className='btn btn-info btn-sm'
                            onClick={() => onReset()}
                          >
                            <FontAwesomeIcon icon={faSync} />
                          </button>
                        </span>
                      </>
                    ) : null}
                  </div>
                </p>
              </div>
              <div className='col-md-6'>
                <Input
                  type='number'
                  name='username'
                  label='5 cent coins'
                  placeholder='Enter cent'
                  value={username}
                  onChange={onChange}
                  readOnly={isEdit ? false : true}
                  valid={validObj.validUsername}
                />
              </div>
              <div className='col-md-6'>
                <Input
                  type='number'
                  name='username'
                  label='10 cent coins'
                  placeholder='Enter cent'
                  value={username}
                  onChange={onChange}
                  readOnly={isEdit ? false : true}
                  valid={validObj.validUsername}
                />
              </div>
              <div className='col-md-6'>
                <Input
                  type='number'
                  name='username'
                  label='20 cent coins'
                  placeholder='Enter cent'
                  value={username}
                  onChange={onChange}
                  readOnly={isEdit ? false : true}
                  valid={validObj.validUsername}
                />
              </div>
              <div className='col-md-6'>
                <Input
                  type='number'
                  name='username'
                  label='50 cent coins'
                  placeholder='Enter cent'
                  value={username}
                  onChange={onChange}
                  readOnly={isEdit ? false : true}
                  valid={validObj.validUsername}
                />
              </div>{' '}
              <div className='col-md-6'>
                <Input
                  type='number'
                  name='username'
                  label='100 cent coins'
                  placeholder='Enter cent'
                  value={username}
                  onChange={onChange}
                  readOnly={isEdit ? false : true}
                  valid={validObj.validUsername}
                />
              </div>
            </>
          ) : null}
          {isEdit ? (
            <div className='col-md-12'>
              <input
                type='submit'
                className='btn btn-primary mt-3'
                value='Update'
              />
              <input
                type='button'
                className='btn btn-primary mt-3'
                value='Cancel'
                onClick={() => onEditProfile()}
              />
            </div>
          ) : null}
        </div>
      </form>

      <div>
        <button
          className='btn btn-danger btn-sm float-right'
          onClick={() => onDeleteAccount()}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
