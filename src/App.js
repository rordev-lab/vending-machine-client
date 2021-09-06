import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import PrivateRoute from './Routes/PrivateRoute';
import { isUserAuthenticated } from './utils/auth';
import {
  Header,
  Footer,
  HomePage,
  Register,
  Login,
  Profile,
  NotFoundPage,
} from './components';
import { showSuccess } from './utils/toast';

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (isUserAuthenticated()) {
      setLoggedIn(true);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserAuthenticated()]);

  /*
----------------------------
  Function to manage logout
----------------------------
 */
  const onLogOut = () => {
    setLoggedIn(false);
    showSuccess('Logout successful');
    localStorage.removeItem('uid');
    localStorage.removeItem('role');
    localStorage.removeItem('client');
    localStorage.removeItem('authToken');
    localStorage.removeItem('id');
    window.location.reload();
    props.history.push('/login');
  };

  return (
    <div className='App'>
      <Header onLogOut={onLogOut} loggedIn={loggedIn} />
      <main>
        <Switch>
          <PrivateRoute exact path='/' component={HomePage} />{' '}
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <PrivateRoute exact path='/profile' component={Profile} />{' '}
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default withRouter(App);
