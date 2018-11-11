import React, { Component } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import { getIsChildOfParent } from '../utils/dom';

const styles = {
  card: {
    marginBottom: 15,
    width: 400,
  },
  marginBottom: {
    marginBottom: 15,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 10,
    marginTop: 10,
  },
  action: {
    fontSize: 12,
    padding: 10,
  },
};

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      message: '',
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
    if (this.state.drawerOpen && !getIsChildOfParent(document.getElementById(appt.datetime), e.target)) {
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

  handleDecline = () => {
    const { appt } = this.props;
    const { message } = this.state;

    axios.delete('api/appointments', {
      params: {
        id: appt.id,
        msg: message,
      },
    });

    // Todo: update store with modified appt
    this.toggleDrawer();
  };

  handleAccept = () => {
    const { appt } = this.props;
    const { message } = this.state;

    axios.post('api/appointments', {
      params: {
        id: appt.id,
        msg: message,
      },
    });

    // Todo: update store with modified appt
    this.toggleDrawer();
  };

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render() {
    const { appt, classes } = this.props;
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
        {appt.status === 'pending' ?
          <Collapse isOpened={this.state.drawerOpen}>
            <Divider />
            <CardContent>
              <div>
                <div className={classes.header}>Message to Patient</div>
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
                    <Button fullWidth onClick={this.handleDecline}>
                      Decline Request
                    </Button>
                  </div>
                  <Divider />
                  <div>
                    <Button
                      onClick={this.handleAccept}
                      variant="raised"
                      color="primary"
                      className={classes.action}
                      fullWidth
                    >
                      Accept Request
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Collapse> : null
        }
      </Card>
    );
  }
}

Appointment.propTypes = {
  appt: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    purpose: PropTypes.string,
    datetime: PropTypes.string,
  }),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Appointment);
