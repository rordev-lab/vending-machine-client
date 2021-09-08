import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSync, faTrash } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import { profileValidationFunc } from '../../utils/formValidator';
import Input from '../Common/Input';
import { isSellerUser } from '../../utils/auth';

const ProfileForm = ({
  inputs,
  isEdit,
  onSubmit,
  isLoading,
  coinInputs,
  getBalance,
  onEditProfile,
  isDepositEdit,
  onEditDeposit,
  onInputChange,
  onResetDeposit,
  onDepositSubmit,
  onDeleteAccount,
  onCoinInputChange,
}) => {
  const { username, email } = inputs;
  const {
    cent5 = '',
    cent10 = '',
    cent20 = '',
    cent50 = '',
    cent100 = '',
  } = coinInputs;
  let validObj = profileValidationFunc(username, email);

  return (
    <div className='container'>
      {isLoading ? (
        <div className='space-top'>
          <Skeleton count={10} />
        </div>
      ) : (
        <>
          <div className='row space-top'>
            <div className='col-md-2'>
              <h1>Profile</h1>
            </div>
            <div className='col-md-10'>
              <button
                className='btn btn-info btn-sm float-right'
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
                  onChange={onInputChange}
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
                  onChange={onInputChange}
                  valid={validObj.validEmail}
                />
              </div>{' '}
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

          <form onSubmit={onDepositSubmit}>
            <div className='row space-top'>
              {!isSellerUser() ? (
                <>
                  <div className='col-md-12'>
                    <p className='mt-2'>
                      <b>Balance is {getBalance()}</b>
                    </p>
                    <p className='mt-2'>
                      <div className='d-flex'>
                        <span>
                          <b>Deposits :- </b>
                        </span>
                        {!isDepositEdit ? (
                          <>
                            <span>
                              <button
                                type='button'
                                className='btn btn-info btn-sm'
                                onClick={() => onResetDeposit()}
                              >
                                <FontAwesomeIcon icon={faSync} /> Reset
                              </button>
                            </span>
                            <span>
                              <button
                                type='button'
                                className='btn btn-info btn-sm'
                                onClick={() => onEditDeposit()}
                              >
                                <FontAwesomeIcon icon={faEdit} /> Edit
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
                      name='cent5'
                      label='5 cent coins'
                      placeholder='Enter cent'
                      value={cent5}
                      onChange={onCoinInputChange}
                      readOnly={isDepositEdit ? false : true}
                      nonValid={true}
                    />
                  </div>
                  <div className='col-md-6'>
                    <Input
                      type='number'
                      name='cent10'
                      label='10 cent coins'
                      placeholder='Enter cent'
                      value={cent10}
                      onChange={onCoinInputChange}
                      readOnly={isDepositEdit ? false : true}
                      nonValid={true}
                    />
                  </div>
                  <div className='col-md-6'>
                    <Input
                      type='number'
                      name='cent20'
                      label='20 cent coins'
                      placeholder='Enter cent'
                      value={cent20}
                      onChange={onCoinInputChange}
                      readOnly={isDepositEdit ? false : true}
                      nonValid={true}
                    />
                  </div>
                  <div className='col-md-6'>
                    <Input
                      type='number'
                      name='cent50'
                      label='50 cent coins'
                      placeholder='Enter cent'
                      value={cent50}
                      onChange={onCoinInputChange}
                      readOnly={isDepositEdit ? false : true}
                      nonValid={true}
                    />
                  </div>{' '}
                  <div className='col-md-6'>
                    <Input
                      type='number'
                      name='cent100'
                      label='100 cent coins'
                      placeholder='Enter cent'
                      value={cent100}
                      onChange={onCoinInputChange}
                      readOnly={isDepositEdit ? false : true}
                      nonValid={true}
                    />
                  </div>
                </>
              ) : null}
              {isDepositEdit ? (
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
                    onClick={() => onEditDeposit()}
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
        </>
      )}{' '}
    </div>
  );
};

export default ProfileForm;
