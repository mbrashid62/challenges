import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

import PatientList from '../components/PatientList';
import { fetchPatient } from '../../services/patient';

const styles = {
  welcomeMessage: {
    color: 'black',
  },
  searchWrapper: {
    padding: '5px 10px',
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 7,
  },
  search: {
    fontSize: 11,
  },
  patients: {
    marginTop: 40,
  },
};


class DoctorHome extends Component {
  static displayName = 'patient-portal/client/containers/DoctorHome';

  static propTypes = {
    doctor: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    patients: [],
    searchText: '',
  };

  componentDidMount() {
    this.getPatientsById(this.props.doctor.id);
  }

  onSearchChange = (e) => {
    this.setState({
      searchText: e.target.value.toLowerCase(),
    });
  };

  getPatientsById = (doctorId = '') => {
    fetchPatient({ doctor_id: doctorId })
      .then((response) => this.setState({ patients: response.data }));
  };
  // This assumes a doctor's patient list is going to be relatively small at first.
  // That said, it is more efficient to perform filtering in the browser to avoid network hops.
  // As patient numbers increase over time, filtering should be handled on the backend.
  // This would require us to hit an endpoint and throttle requests here.
  // For now, this will suffice.
  getFilteredPatients = (patients) => {
    if (this.state.searchText !== '') {
      return _.filter(
        patients,
        (p) => p.firstName.toLowerCase().includes(this.state.searchText) || p.lastName.toLowerCase().includes(this.state.searchText),
      );
    }

    return patients;
  };

  render() {
    const {
      classes,
      doctor,
    } = this.props;

    const { patients } = this.state;

    return (
      <div className="container">
        <h2 className={classes.welcomeMessage}>Welcome back, {doctor.firstName}.</h2>
        <div className={classes.patients}>
          {patients.length ?
            <div>
              <Card className={classes.searchWrapper}>
                <Icon className={classes.searchIcon}>search</Icon>
                <TextField
                  name="search"
                  placeholder="Search patients"
                  className={classes.search}
                  inputProps={{ style: { fontSize: 12 } }}
                  onChange={this.onSearchChange}
                />
              </Card>
              <PatientList patients={this.getFilteredPatients(this.state.patients)} />
            </div>
            : <div>{'You don\'t have any patients.'}</div>
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DoctorHome);
