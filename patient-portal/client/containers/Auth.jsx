import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Cookies from 'js-cookie';

import * as authActions from '../actions/auth';

export class Auth extends Component {
  static displayName = 'patient-portal/client/containers/Auth';

  static propTypes = {
    children: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    loggedInUser: PropTypes.object.isRequired,
    loginActions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const userCookieData = this.getUserCookieData();

    if (!_.isEmpty(userCookieData)) {
      this.props.loginActions.dispatchSetUser(userCookieData.user);
      this.sendToDashboard();
    }
  }

  componentDidUpdate(prevProps) {
    if (_.isEmpty(prevProps.loggedInUser) && !_.isEmpty(this.props.loggedInUser)) {
      this.setUserCookie(this.props.loggedInUser);
      this.sendToDashboard();
    }
  }

  getUserCookieData = () => Cookies.getJSON('_authCookie') || {};

  setUserCookie = (user) => {
    Cookies.set('_authCookie', {
      user,
    });
  };

  sendToDashboard = () => this.props.history.push('/dashboard');

  render() {
    return (
      <div className="auth-wrapper container">
        {this.props.children}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  loggedInUser: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
