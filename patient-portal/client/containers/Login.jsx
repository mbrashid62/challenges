import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import * as authActions from '../actions/auth';
import { API_STATUS } from '../reducers/auth';
import Protected from './Protected';

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
      promptMessage: 'Login Below',
    };
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { loginStatus } = this.props;
    if ((prevProps.loginStatus !== loginStatus) && (loginStatus === API_STATUS.FAILURE)) {
      this.updatePromptMessage('Whoops try again!');
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

  onLoginClick = (e) => {
    e.preventDefault();
    const { loginActions } = this.props;
    loginActions.dispatchLoginAttempt(this.state.email, this.state.password);
  };

  updatePromptMessage = (txt) => this.setState({ promptMessage: txt });

  // Todo: provide more robust email validation
  isValidEmail = (email = '') => email.includes('@');

  render() {
    const { classes } = this.props;
    return (
      <Protected>
        <div className="login-container">
          <div>
            <h2 className="login-header">Log in</h2>
          </div>
          <span>{this.state.promptMessage}</span>
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
                onClick={this.onLoginClick}
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
      </Protected>
    );
  }
}

const mapStateToProps = (state) => ({
  loginStatus: state.user.status,
});

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(authActions, dispatch),
});

Login.propTypes = {
  loginActions: PropTypes.object,
  loginStatus: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Login)));
