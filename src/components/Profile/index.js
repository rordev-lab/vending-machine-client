import React, { useEffect, useState } from 'react';

import {
  fetchProfile,
  resetDeposits,
  deleteAccount,
  updateProfile,
} from '../../Services';
import { profileValidationFunc } from '../../utils/formValidator';
import { confirmBox, showError, showSuccess } from '../../utils/toast';
import ProfileForm from './Profile';

const initialStates = {
  username: '',
  email: '',
};

const Profile = (props) => {
  // states
  const [inputs, setInputs] = useState(initialStates);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getProfileData();
  }, []);

  // function to fetch profile data
  const getProfileData = async () => {
    const result = await fetchProfile();
    setInputs({
      email: result.email,
      username: result.username,
    });
  };

  // function to manage input states
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // function to manage add profile toggle
  const onEditProfile = () => setIsEdit(!isEdit);

  // function to update profile
  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, email } = inputs;
    let validObj = profileValidationFunc(username, email);
    if (validObj.validForm) {
      const result = await updateProfile({ username });
      if (result.status === 200) {
        showSuccess('Profile updated successfully');
        onEditProfile();
      }
    } else {
      showError('Please check form errors');
    }
  };

  // function to delete account
  const onDeleteAccount = async () => {
    const { value } = await confirmBox({
      title: 'Are you sure?',
      text: 'Do you want to delete your account',
    });
    if (!value) {
      return;
    } else {
      await deleteAccount();
      showSuccess('Account deleted successfully');
      localStorage.removeItem('uid');
      localStorage.removeItem('role');
      localStorage.removeItem('client');
      localStorage.removeItem('authToken');
      localStorage.removeItem('id');
      window.location.reload();
      props.history.push('/login');
    }
  };

  const onReset = async () => {
    const { value } = await confirmBox({
      title: 'Are you sure?',
      text: 'Do you want to reset this deposit',
    });
    if (!value) {
      return;
    } else {
      await resetDeposits();
      showSuccess('Deposit reset successfully');
    }
  };

  return (
    <div className='container'>
      <ProfileForm
        isEdit={isEdit}
        onSubmit={onSubmit}
        onChange={onChange}
        inputs={inputs}
        onReset={onReset}
        onEditProfile={onEditProfile}
        onDeleteAccount={onDeleteAccount}
      />
    </div>
  );
};

export default Profile;
