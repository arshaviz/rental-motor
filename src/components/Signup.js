/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { loginHandler } from '../actions/index';
import { apiSignUp } from '../axios';

const Signup = props => {
  const { loginHandler } = props;
  const { register, errors, handleSubmit } = useForm();
  const [apiErrors, setErrors] = useState([]);
  const renderErrors = () => (
    <ul className="text-danger">
      {apiErrors.map(error => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );

  const redirect = () => {
    props.history.push('/');
  };

  const onSubmit = data => {
    const user = { ...data, role: 'USER' };
    apiSignUp(user, loginHandler, redirect, setErrors);
  };

  return (
    <div className="login-clean w-100 vh-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="illustration" style={{ padding: 0 }}>
          <i
            className="icon ion-android-contact"
            style={{ color: '#00a5ff', fontSize: 90 }}
          />
        </div>
        <h4 className="my-4" style={{ textAlign: 'center' }}>
          Create a new account
        </h4>
        {apiErrors.length > 0 ? renderErrors() : null}
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="userName"
            placeholder="Username"
            ref={register({ required: true })}
          />
          {errors.userName && errors.userName.type === 'required' && (
            <span className="text-danger">This is required</span>
          )}
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            ref={register({ required: true })}
          />
          {errors.email && errors.email.type === 'required' && (
            <span className="text-danger">This is required</span>
          )}
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            ref={register({ required: true })}
          />
          {errors.password && errors.password.type === 'required' && (
            <span className="text-danger">This is required</span>
          )}
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password_confirmation"
            placeholder="Re-enter Password"
            ref={register({ required: true })}
          />
          {errors.password_confirmation
            && errors.password_confirmation.type === 'required' && (
              <span className="text-danger">This is required</span>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-customized btn-block" type="submit">
            Sign Up
          </button>
        </div>
        <div className="text-center">
          <span>Already member ?&nbsp;</span>
          <Link to="/login" style={{ color: '#00a5ff' }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

Signup.propTypes = {
  loginHandler: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history,
};

export default connect(null, { loginHandler })(Signup);
