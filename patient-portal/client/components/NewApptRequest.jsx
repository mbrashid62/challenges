import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DateField } from 'react-date-picker';
import axios from 'axios';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import 'react-date-picker/index.css';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 300,
  },
  formRow: {
    minWidth: 200,
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 12,
  },
};

class NewApptRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '', // eslint-disable-line react/no-unused-state
      dateMoment: {}, // eslint-disable-line react/no-unused-state
    };
  }

  onSubmitRequest = (e) => {
    e.preventDefault();

    const { user } = this.props;
    const { dateString } = this.state;

    axios.create('api/appointments', {
      params: {
        user_id: user.id,
        date_string: dateString,
      },
    })
      .then((response) => {

      })
      .catch((error) => {

      });
  };

  onDatePickBlur = (e) => {
    this.setState({
      dateString: e.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <div>
          <h2>Request an Appointment</h2>
        </div>
        <form className={classes.form} onSubmit={this.onSubmitRequest}>
          <div className={classes.formRow}>
            <div className={classes.dateLabel}>Date</div>
            <DateField
              dateFormat="YYYY-MM-DD hh:mm a"
              onBlur={this.onDatePickBlur}
              onExpandChange={this.onExpandChange}
            />
          </div>
          <Button
            variant="raised"
            color="primary"
            disabled={this.state.dateString === ''}
          >
            Submit Request
          </Button>
        </form>
      </div>
    );
  }
}


NewApptRequest.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewApptRequest));
