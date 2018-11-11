import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DoctorsAppointment from '../components/appointments/DoctorsAppointment';
import PatientAppointments from '../components/appointments/PatientAppointments';

import { USER_ROLES } from '../constants/roles';

// I chose to create two patient components here in order to take a more compositional approach.
// If I were to discern between doctor/patient in one component, I would be able to share much of the overlapping logic.
// However, this would mean both doctor/patient component types would be heavily coupled together. This would introduce bugs and scaling difficulties.
// By creating two independent components, we honor the functional programming principle of composition and introduce a much more robust application architecture.
// This implementation allows us to define new behavior in Patient Appointments without impacting Doctor Appointments and vice versa.
const Appointments = ({ appointments, user }) => (
  <div className="appointment-wrapper">
    {appointments.map((appt) => (
      <div key={appt.id}>
        {user.role === USER_ROLES.DOCTOR && <DoctorsAppointment appt={appt} />}
        {user.role === USER_ROLES.PATIENT && <PatientAppointments appt={appt} /> }
      </div>
    ))}
  </div>
);

Appointments.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object),
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

export default connect(mapStateToProps, () => ({}))(Appointments);
