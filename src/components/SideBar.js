import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapSessionToProps } from '../helpers/index';
import { logoutHandler } from '../actions/index';
import '../assets/css/sidebar.css';
import logo from '../assets/images/logo.png';

const SideBar = props => {
  const { session, logoutHandler } = props;
  const location = useLocation().pathname;
  const [navToggle, setNavToggle] = useState(false);
  const handleNavToggle = () => {
    setNavToggle(!navToggle);
  };

  const handleLogOut = () => {
    logoutHandler();
  };

  return (
    <>
      <button
        onClick={handleNavToggle}
        className="btn btn-link"
        style={{ cursor: 'pointer', position: 'absolute' }}
        aria-hidden="true"
        type="button"
      >
        <i className="fa fa-bars show-icon" />
      </button>
      <nav
        className="col-2 sidebar flex-grow-1"
        style={{ display: !navToggle ? 'block' : 'none' }}
      >
        <div className="mb-5 logo">
          <Link to="/">
            <img src={logo} alt="logo" className="w-100" />
          </Link>
        </div>
        <ul className="list-unstyled">
          <li>
            <Link
              className={`nav-link ${location === '/' ? 'active' : ''}`}
              to="/"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.includes('items') ? 'active' : ''
              }`}
              to="/items"
            >
              MOTORCYCLE
            </Link>
          </li>
          {session.isLoggedIn && session.user.role === 'USER' ? (
            <li>
              <Link
                className={`nav-link ${location === '/profil' ? 'active' : ''}`}
                to="/profil"
              >
                PROFIL
              </Link>
            </li>
          ) : null}
          {session.isLoggedIn && session.user.role === 'ADMIN' ? (
            <li>
              <Link
                className={`nav-link ${location === '/panel' ? 'active' : ''}`}
                to="/panel"
              >
                PANEL
              </Link>
            </li>
          ) : null}
        </ul>
        <div className="d-flex flex-column align-items-center mt-5">
          {!session.isLoggedIn ? (
            <>
              <Link
                to="/signup"
                className="btn rounded-pill btn-customized w-75 mb-2"
              >
                SIGN UP
              </Link>

              <span style={{ fontSize: '13px' }}>Already member ?&nbsp;</span>
              <Link to="/login" style={{ color: '#00a5ff' }}>
                Login
              </Link>
            </>
          ) : (
            <>
              <span style={{ fontSize: '13px' }}>Logged In as :</span>
              <h6 className="font-weight-bold">{session.user.userName}</h6>
              <Link
                to="/login"
                style={{ color: '#00a5ff' }}
                onClick={handleLogOut}
              >
                Logout
              </Link>
            </>
          )}
        </div>
          <span style={{ fontSize: '12px' }}>
          &copy; Lorem Ipsum
          </span>
      </nav>
    </>
  );
};

SideBar.propTypes = {
  session: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
      userName: PropTypes.string,
      role: PropTypes.string,
    }),
  }).isRequired,
  logoutHandler: PropTypes.func.isRequired,
};

export default connect(mapSessionToProps, { logoutHandler })(SideBar);
