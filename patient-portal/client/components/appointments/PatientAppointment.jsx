import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import { getIsChildOfElement } from '../../utils/dom';
import { deleteAppointment } from '../../../services/appointment';

import { styles } from './styles/apptStyles';

class PatientAppointment extends Component {
  static displayName = 'patient-portal/client/components/PatientAppointments';

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      message: '',
      isRemoved: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onDomBodyClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onDomBodyClick);
  }

  onDomBodyClick = (e) => {
    const { appt } = this.props;

    // if our drawer is open and we have not clicked within the card, let's close it
    if (this.state.drawerOpen && !getIsChildOfElement(document.getElementById(appt.datetime), e.target)) {
      this.toggleDrawer();
    }
  };

  onMessageChange(evt) {
    this.setState({ message: evt.target.value });
  }

  onCardClick = (e, appt) => {
    if (appt.status === 'pending' && !this.state.drawerOpen) {
      this.toggleDrawer();
    }
  };

  handleCancelRequest = () => {
    const params = {
      id: this.props.appt.id,
      msg: this.state.message,
    };

    deleteAppointment(params)
      .then((response) => {
        this.setState({
          message: '',
          isRemoved: true,
        });
        // Todo: update store with modified appt
      });
    this.toggleDrawer();
  };

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render() {
    const {
      appt,
      classes,
    } = this.props;

    if (this.state.isRemoved) {
      return null;
    }

    return (
      <Card id={appt.datetime} key={appt.datetime} className={classes.card} onClick={(e) => this.onCardClick(e, appt)}>
        <CardContent>
          <div className={classes.content}>
            <div>
              <div className={classes.header}>{appt.datetime}</div>
              <div>
                {appt.purpose}
              </div>
            </div>
          </div>
        </CardContent>
        {appt.status === 'pending' && (
          <Collapse isOpened={this.state.drawerOpen}>
            <Divider />
            <CardContent>
              <div>
                <div className={classes.header}>Message to Doctor</div>
                <form>
                  <div className={classes.marginBottom}>
                    <TextField
                      name="message"
                      onChange={this.onMessageChange}
                      value={this.state.message}
                      inputProps={{ style: { fontSize: 11 } }}
                      multiline
                      fullWidth
                    />
                  </div>
                  <div>
                    <Button fullWidth onClick={this.handleCancelRequest}>
                      Cancel Request
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Collapse>
        )}
      </Card>
    );
  }
}

PatientAppointment.propTypes = {
  appt: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    purpose: PropTypes.string,
    datetime: PropTypes.string,
  }),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientAppointment);
