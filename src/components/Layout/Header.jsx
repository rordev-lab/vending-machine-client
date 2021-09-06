import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = (props) => {
  const { loggedIn, onLogOut } = props;
  return (
    <header>
      <nav className='navbar navbar-dark bg-warning'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Link className='navbar-brand' to='/' exact>
                Vending Machine App
              </Link>
              {!loggedIn ? (
                <>
                  <NavLink className='nav-link' to='/login'>
                    Login
                  </NavLink>
                  <NavLink className='nav-link' to='/register'>
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className='nav-link' to='/' exact>
                    Products
                  </NavLink>{' '}
                  <NavLink className='nav-link' to='/profile'>
                    Profile
                  </NavLink>{' '}
                  {/* eslint-disable-next-line */}
                  <a className='nav-link' href='#' onClick={onLogOut}>
                    Logout
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export { Header };
