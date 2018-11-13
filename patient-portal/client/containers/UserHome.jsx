import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

import Protected from './Protected';
import DoctorHome from './DoctorHome';
import PatientHome from './PatientHome';

import { USER_ROLES } from '../constants/roles';

const UserHome = ({ activeUserData }) => (
  <div className="user-home container">
    <Protected>
      {get(activeUserData, 'role', false) === USER_ROLES.DOCTOR && (<DoctorHome doctor={activeUserData} />)}
      {get(activeUserData, 'role', false) === USER_ROLES.PATIENT && (<PatientHome patient={activeUserData} />)}
    </Protected>
  </div>
);

UserHome.propTypes = {
  activeUserData: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

UserHome.displayName = 'patient-portal/client/containers/UserHome';

export default connect((state) => ({
  activeUserData: state.user.user,
}))(UserHome);
