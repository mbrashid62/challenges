import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

import * as patientActions from '../actions/patients';

const styles = {
  container: {
    marginTop: 30,
    padding: '5px 20px 5px 20px',
  },
  patientRow: {
    cursor: 'pointer',
  },
  patientInfo: {
    fontSize: 14,
    height: 50,
    display: 'flex',
    alignItems: 'center',
  },
};


export class PatientList extends Component {
  static displayName = 'patient-portal/client/components/PatientList';

  static propTypes = {
    patients: PropTypes.arrayOf(PropTypes.object),
    allPatientActions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  };

  onPatientSelection = (patient) => {
    const {
      history,
      allPatientActions,
    } = this.props;

    axios.get('/api/patients', {
      params: {
        patient_id: patient.user_id,
      },
    })
      .then((response) => allPatientActions.dispatchSetActivePatient(response.data))
      .catch(() => {});

    history.push(`/patient/${patient.user_id}`);
  };

  render() {
    const {
      classes,
      patients,
    } = this.props;

    return (
      <Paper className={classes.container}>
        <h3>Patients</h3>
        {patients.map((patient) => (
          <div
            key={patient.user_id}
            onClick={() => this.onPatientSelection(patient)}
            onKeyPress={() => this.onPatientSelection(patient)}
            className={classes.patientRow}
          >
            <Divider />
            <div className={classes.patientInfo}>
              {patient.firstName} {patient.lastName}
            </div>
          </div>
        ))}
      </Paper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  allPatientActions: bindActionCreators(patientActions, dispatch),
});

export default connect(() => ({}), mapDispatchToProps)(withRouter(withStyles(styles)(PatientList)));
