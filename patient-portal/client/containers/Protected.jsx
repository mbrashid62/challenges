import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Cookies from 'js-cookie';

import * as authActions from '../actions/auth';

export class Protected extends Component {
  static displayName = 'patient-portal/client/containers/Protected';

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.node,
    ]).isRequired,
    history: PropTypes.object.isRequired,
    loggedInUser: PropTypes.object,
  };

  componentDidMount() {
    const { loggedInUser } = this.props;

    // if we have logged in active user, send them to the dashboard
    // otherwise, prompt them to login
    if (!_.isEmpty(loggedInUser)) {
      this.sendToDashboard();
    } else {
      this.sendToLogin();
    }
  }

  componentDidUpdate(prevProps) {
    // on successful login, let's set our auth cookie and redirect to the dashboard
    if (_.isEmpty(prevProps.loggedInUser) && !_.isEmpty(this.props.loggedInUser)) {
      this.setUserCookie(this.props.loggedInUser);
      this.sendToDashboard();
    }
  }

  setUserCookie = (user) => {
    Cookies.set('_authCookie', {
      user,
    });
  };

  sendToDashboard = () => this.props.history.push('/dashboard');

  sendToLogin = () => this.props.history.push('/login');

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Protected));
