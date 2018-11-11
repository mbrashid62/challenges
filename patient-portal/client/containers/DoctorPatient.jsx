import React from 'react';
import Appointments from './Appointments';
import PatientDetails from '../components/PatientDetails';
import Files from '../components/Files';

// Todo: connect to store to read this data
import { patient, pendingAppts, pastAppts, files } from '../dummyData';

class Patient extends React.Component {
  componentDidMount() {
    console.log('patient component mounted');
  }

  render() {
    return (
      <div className="container">
        <h2>Luna Lovegood</h2>
        <PatientDetails patient={patient} />
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

export default Patient;
