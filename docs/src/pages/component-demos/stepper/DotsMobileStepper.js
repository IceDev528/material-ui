// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';

const styleSheet = createStyleSheet({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
});

class DotsMobileStepper extends Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <MobileStepper
        type="dots"
        steps={6}
        position="static"
        activeStep={this.state.activeStep}
        className={classes.root}
        onBack={this.handleBack}
        onNext={this.handleNext}
        disableBack={this.state.activeStep === 0}
        disableNext={this.state.activeStep === 5}
      />
    );
  }
}

DotsMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(DotsMobileStepper);
