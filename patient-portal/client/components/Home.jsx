import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../containers/Login';

const Home = ({ user }) => (
  <Route
    path="/"
    render={() => {
      if (user && user.role === 'doctor') {
        return <Redirect to="/dashboard" />;
      } else if (user && user.role === 'patient') {
        return <Redirect to="/account" />;
      }
      return <Login />;
    }}
  />
);

const mapStateToProps = ({ user }) => ({ user });

Home.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Home);
