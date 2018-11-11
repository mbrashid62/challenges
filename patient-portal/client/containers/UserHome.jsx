import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Protected from './Protected';
import DoctorHome from './DoctorHome';

class UserHome extends React.Component {
  static displayName = 'patient-portal/client/containers/UserHome';

  state = {
    activeUser: {},
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.updateActiveUserState(this.props.user);
    }
  }

  updateActiveUserState = (user) => {
    this.setState({
      activeUser: user,
    });
  };

  render() {
    const { activeUser } = this.state;
    const isDoctor = _.get(activeUser, 'role', false) === 'doctor';
    return (
      <Protected>
        {isDoctor && (<DoctorHome doctor={activeUser} />)}
      </Protected>
    );
  }
}
UserHome.propTypes = {
  user: PropTypes.object.isRequired,
};

UserHome.displayName = 'patient-portal/client/containers/UserHome';

export default connect((state) => ({
  user: state.user.user,
}))(UserHome);
