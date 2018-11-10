import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DoctorHome from './DoctorHome';
import PatientHome from './PatientHome';

const UserHome = ({ user }) => user.role === 'doctor' ? <DoctorHome doctor={user} /> : <PatientHome user={user} />;

UserHome.propTypes = {
  user: PropTypes.object.isRequired,
};

UserHome.displayName = 'patient-portal/client/containers/UserHome';

export default connect((state) => ({
  user: state.user.user,
}))(UserHome);
