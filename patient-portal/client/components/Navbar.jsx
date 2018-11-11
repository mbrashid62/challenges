import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Cookies from 'js-cookie';

import * as authActions from '../actions/auth';

const styles = {
  container: {
    display: 'flex',
  },
  button: {
    color: 'white',
    textDecoration: 'none',
  },
};

const onLogoutClick = (logoutAction = () => {}) => {
  Cookies.remove('_authCookie');
  logoutAction();
};

const Navbar = ({ classes, loggedInUser, loginActions }) => (
  <AppBar className={classes.container}>
    <Toolbar>
      <Button>
        <Link to="/" className={classes.button}>Home</Link>
      </Button>
      {!isEmpty(loggedInUser) && (
        <Button onClick={() => onLogoutClick(loginActions.dispatchLogout)}>
          <Link to="/" className={classes.button}>Logout</Link>
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  loginActions: PropTypes.object.isRequired,
};

const mapStateToProps = (state = {}) => ({
  loggedInUser: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));
