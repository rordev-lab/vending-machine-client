import React, { useEffect, useState } from 'react';
import {
  fetchProfile,
  resetDeposits,
  deleteAccount,
  updateProfile,
  updateDeposits,
} from '../../services';
import { profileValidationFunc } from '../../utils/formValidator';
import { confirmBox, showError, showSuccess } from '../../utils/toast';
import ProfileForm from './Profile';

const initialStates = {
  username: '',
  email: '',
};

const coinsInitialStates = {
  cent5: '',
  cent10: '',
  cent20: '',
  cent50: '',
  cent100: '',
};

const Profile = (props) => {
  // states
  const [inputs, setInputs] = useState(initialStates);
  const [isEdit, setIsEdit] = useState(false);
  const [isDepositEdit, setIsDepositEdit] = useState(false);
  const [coinInputs, setCoinInputs] = useState(coinsInitialStates);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfileData();
  }, []);

  // function to fetch profile data
  const getProfileData = async () => {
    setIsLoading(true);
    const result = await fetchProfile();
    setInputs({
      email: result.email,
      username: result.username,
    });
    setIsLoading(false);
    if (result.deposit) {
      const deposit = result.deposit
        ? result.deposit
        : JSON.parse(result.deposit);
      setCoinInputs(deposit);
    }
  };

  // function to manage input states
  const onInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // function to manage input states
  const onCoinInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setCoinInputs({
      ...coinInputs,
      [name]: value,
    });
  };

  // function to manage add profile toggle
  const onEditProfile = () => setIsEdit(!isEdit);

  // function to manage edit deposit toggle
  const onEditDeposit = () => setIsDepositEdit(!isDepositEdit);

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

  // function to reset deposit
  const onResetDeposit = async () => {
    const { value } = await confirmBox({
      title: 'Are you sure?',
      text: 'Do you want to reset this deposit',
    });
    if (!value) {
      return;
    } else {
      await resetDeposits();
      showSuccess('Deposit reset successfully');
      setCoinInputs(coinsInitialStates);
    }
  };

  // function to manage add/edit deposit form submit
  const onDepositSubmit = async (e) => {
    e.preventDefault();
    const result = await updateDeposits({
      deposit: JSON.stringify(coinInputs),
    });
    if (result.status === 200) {
      showSuccess('Deposit updated successfully');
      onEditDeposit();
    }
  };

  // function to get balance
  const getBalance = () => {
    var balance = 0;
    const cent5 = coinInputs.cent5 ? coinInputs.cent5 * 5 : 0;
    const cent10 = coinInputs.cent10 ? coinInputs.cent10 * 10 : 0;
    const cent20 = coinInputs.cent20 ? coinInputs.cent20 * 20 : 0;
    const cent50 = coinInputs.cent50 ? coinInputs.cent50 * 50 : 0;
    const cent100 = coinInputs.cent100 ? coinInputs.cent100 * 100 : 0;
    balance = cent5 + cent10 + cent20 + cent50 + cent100;
    return balance.toFixed(2);
  };

  return (
    <div className='container'>
      <ProfileForm
        isEdit={isEdit}
        inputs={inputs}
        onSubmit={onSubmit}
        isLoading={isLoading}
        coinInputs={coinInputs}
        getBalance={getBalance}
        isDepositEdit={isDepositEdit}
        onInputChange={onInputChange}
        onEditProfile={onEditProfile}
        onEditDeposit={onEditDeposit}
        onResetDeposit={onResetDeposit}
        onDepositSubmit={onDepositSubmit}
        onDeleteAccount={onDeleteAccount}
        onCoinInputChange={onCoinInputChange}
      />
    </div>
  );
};

export default Profile;
