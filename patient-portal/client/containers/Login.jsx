import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import * as authActions from '../actions/auth';

const styles = {
  textField: {
    marginBottom: 20,
  },
  button: {
    height: 40,
    color: 'white',
    fontWeight: 100,
    marginTop: 10,
  },
};

const INPUT_FIELD_TYPES = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      enableLogin: false,
    };
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loginStatus === 'PENDING' && this.props.loginStatus === 'SUCCESS') {
      this.props.history.push('/dashboard');
    }
  }


  onPasswordChange(type, value) {
    this.setState({
      [type]: value,
    });
  }

  onLoginChange = (type, value) => {
    this.setState({
      [type]: value,
      enableLogin: this.isValidEmail(value),
    });
  };

  isValidEmail = (email = '') => email.includes('@');

  render() {
    const { loginActions, classes } = this.props;
    return (
      <div className="login-container">
        <div>
          <h2 className="login-header">Log in</h2>
        </div>
        <form className="login-form-wrapper">
          <div>
            <TextField
              name="email"
              placeholder="Email address"
              value={this.state.email}
              onChange={(evt) => {
                this.onLoginChange(INPUT_FIELD_TYPES.EMAIL, evt.target.value);
              }}
              className={classes.textField}
              fullWidth
            />
          </div>
          <div>
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(evt) => {
                this.onPasswordChange(INPUT_FIELD_TYPES.PASSWORD, evt.target.value);
              }}
              className={classes.textField}
              fullWidth
            />
          </div>
          <div>
            <Button
              onClick={(evt) => {
                evt.preventDefault();
                loginActions.dispatchLoginAttempt(this.state.email, this.state.password);
              }}
              variant="raised"
              className={classes.button}
              color="primary"
              disabled={!this.state.enableLogin}
              fullWidth
            >
              Log in
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.user.status,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(authActions, dispatch),
});

Login.propTypes = {
  loginActions: PropTypes.object,
  loginStatus: PropTypes.string,
  history: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Login)));
