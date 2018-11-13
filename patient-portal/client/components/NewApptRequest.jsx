import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DateField } from 'react-date-picker';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import { createAppointment } from '../../services/appointment';
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

  onApptSubmitRequest = (e) => {
    e.preventDefault();

    createAppointment({
      user_id: this.props.user.id,
      date_string: this.state.dateString,
    })
      .then((response) => {
        // Todo: Update store based off of response
        // Todo: show confirmation to user and back button
        this.props.history.goBack();
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
        <form className={classes.form}>
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
            onClick={this.onApptSubmitRequest}
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
  history: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(NewApptRequest)));
