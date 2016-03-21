import React from 'react';
import Stepper from 'material-ui/lib/Stepper/Stepper';
import Step from 'material-ui/Stepper/VerticalStep';
import Paper from 'material-ui/lib/Paper';
import FontIcon from 'material-ui/lib/FontIcon';
import RaisedButton from 'material-ui/lib/RaisedButton';
import FlatButton from 'material-ui/lib/FlatButton';

const styles = {
  paper: {
    width: 500,
    margin: 'auto',
  },
  header: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  },
  actionButton: {
    marginRight: 8,
  },
};

const VerticalNonLinearStepper = React.createClass({
  getInitialState() {
    return {
      activeStep: -1,
      statusSteps: [],
    };
  },

  selectStep(CurrentStep) {
    this.setState({
      activeStep: CurrentStep,
    });
  },

  updateCompletedSteps(CurrentStep) {
    return this.state.statusSteps[CurrentStep];
  },

  createIcon(step) {
    if (step.props.isCompleted) {
      return (
        <FontIcon className="material-icons" style={{fontSize: 14}}>
          done
        </FontIcon>
      );
    }

    return <span>{step.props.orderStepLabel}</span>;
  },

  continue() {
    const {
      activeStep,
      statusSteps,
    } = this.state;

    statusSteps[activeStep] = true;

    this.setState({
      activeStep: activeStep + 1,
      statusSteps: statusSteps,
    });
  },

  render() {
    return (
      <Paper style={styles.paper}>
        <div style={styles.header}>
          Your interests
        </div>
        <Stepper
          activeStep={this.state.activeStep}
          onStepHeaderTouch={this.selectStep}
          updateCompletedStatus={this.updateCompletedSteps}
          createIcon={this.createIcon}
        >
          <Step
            orderStepLabel="1"
            stepLabel="Books"
            actions={[
              <RaisedButton
                key={0}
                label="Finish"
                primary={true}
                onClick={this.continue}
                style={styles.actionButton}
              />,
              <FlatButton
                key={1}
                label="Cancel"
              />,
            ]}
          >
            <div>
              Please list your favorite reads.
            </div>
          </Step>
          <Step
            orderStepLabel="2"
            stepLabel="Movies"
            actions={[
              <RaisedButton
                key={0}
                label="Finish"
                primary={true}
                onClick={this.continue}
                style={styles.actionButton}
              />,
              <FlatButton
                key={1}
                label="Cancel"
              />,
            ]}
          >
            <div style={{height: 50}}>
              Please list your favorite flicks.
            </div>
          </Step>

          <Step
            orderStepLabel="3"
            stepLabel="Music"
            actions={[
              <RaisedButton
                key={0}
                label="Finish"
                primary={true}
                onClick={this.continue}
                style={styles.actionButton}
              />,
              <FlatButton
                key={1}
                label="Cancel"
              />,
            ]}
          >
            <div style={{height: 50}}>
              Please list your favorite tunes.
            </div>
          </Step>
        </Stepper>
      </Paper>
    );
  },
});

export default VerticalNonLinearStepper;
