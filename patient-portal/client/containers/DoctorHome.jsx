import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

import PatientList from '../components/PatientList';

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
  };

  componentDidMount() {
    this.getPatientsById(this.props.doctor.id);
  }

  getPatientsById = (doctorId = '') => {
    axios.get('api/patients', {
      params: {
        id: doctorId,
      },
    })
      .then((response) => {
        this.setState({
          patients: response.data,
        });
      })
      .catch(() => {
        this.setState({
          patients: [],
        });
      });

    this.setState({
      patients: [],
    });
  };

  render() {
    const { classes, doctor } = this.props;
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
                  // onChange={this}
                />
              </Card>
              <PatientList patients={this.state.patients} />
            </div>
            : <div>{'You don\'t have any patients.'}</div>
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DoctorHome);
