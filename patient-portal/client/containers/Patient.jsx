import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Appointments from './Appointments';
import PatientDetails from '../components/PatientDetails';
import Files from '../components/Files';

// Todo: replace rest of data with store data from API
import { patient, pendingAppts, pastAppts, files } from '../dummyData';

class Patient extends React.Component {
  static displayName = 'patient-portal/client/containers/DoctorPatient';

  static propTypes = {
    activePatient: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { activePatient } = this.props;

    if (_.isEmpty(activePatient)) {
      // Todo: fetch patient
    }
  }

  render() {
    const { activePatient } = this.props;
    return (
      <div className="container">
        <h2>{activePatient.firstName} {activePatient.lastName}</h2>
        <PatientDetails patient={activePatient} />
        <div>
          <h3>Appointment Requests</h3>
          <Appointments appointments={pendingAppts} />
        </div>
        <div>
          <h3>Upcoming Appointments</h3>
          <div>No upcoming appointments.</div>
        </div>
        <div>
          <h3>Past Appointments</h3>
          <Appointments appointments={pastAppts} />
        </div>
        <div>
          <h3>Patient Files</h3>
          <Files files={files} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activePatient: state.patients.activePatient,
});

export default connect(mapStateToProps, () => ({}))(Patient);
