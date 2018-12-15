import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Toolbar, Typography, withStyles, Button, Paper } from '@material-ui/core';
import PatreonSponsors from './components/PatreonSponsors';
import PickersLogo from '../assets/pickers-logo.png';

class Demo extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  scrollToContent = () => {
    const contentEl = document.getElementById('content');
    contentEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Toolbar color="primary" className={classes.appToolbar}>
          <Paper elevation={8} className={classes.logoContainer}>
            <img alt="Material-UI logo" className={classes.logo} src={PickersLogo} />
          </Paper>

          <Typography variant="h4" color="inherit" className="title text-light" gutterBottom>
            Material-UI Pickers
          </Typography>

          <Typography
            variant="h5"
            align="center"
            color="inherit"
            gutterBottom
            className="text-light"
          >
            Accessible, customizable, delightful date & time pickers for @material-ui/core
          </Typography>

          <Link to="/installation">
            <Button
              variant="contained"
              className={classes.getStarted}
              onClick={this.scrollToContent}
            >
              Get Started
            </Button>
          </Link>
        </Toolbar>

        <div id="content" className={classes.content}>
          <Typography variant="h4" align="center" gutterBottom>
            Support material-ui-pickers
          </Typography>

          <Typography align="center" gutterBottom>
            Material-UI-pickers is a MIT licensed open source project. We are intent on code quality
            and project maintain. Entirely thanks to our awesome bakers.
          </Typography>

          <Typography align="center" className={classes.sponsorHeader} variant="h5" gutterBottom>
            Our awesome sponsors via{' '}
            <a className="link" href="https://www.patreon.com/user?u=9897423">
              {' '}
              patreon{' '}
            </a>{' '}
            ❤️
          </Typography>
          <PatreonSponsors />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  flex: {
    flex: 1,
  },
  logoContainer: {
    margin: '20px 0',
    borderRadius: '50%',
    padding: '4px 4px 0',
  },
  logo: {
    maxHeight: 200,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  noShadow: {
    boxShadow: 'unset',
  },
  appToolbar: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.common.white,
    padding: '100px 20px',
    minHeight: 'calc(75vh - 55px)',
  },
  getStarted: {
    marginTop: '10px',
  },
  main: {
    backgroundColor: theme.palette.background.default,
    marginBottom: -50,
  },
  content: {
    paddingTop: '80px',
    backgroundColor: theme.palette.background.default,
    minHeight: 'calc(100vh - 63px)',
    maxWidth: 900,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    '@media(max-width: 600px)': {
      minHeight: 'calc(100vh - 55px)',
    },
  },
  changeOutside: {
    maxWidth: 200,
    margin: '0 auto',
  },
  sponsorHeader: {
    marginTop: '2em',
  },
});

export default withStyles(styles)(Demo);
