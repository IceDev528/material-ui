import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { InlineDatePicker } from 'material-ui-pickers/DatePicker';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class ControllingProgrammaticallyExample extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  openPicker = (e) => {
    // do not pass Event for default pickers
    this.picker.open(e);
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <div className={this.props.classes.container}>
        <Button onClick={this.openPicker}> Open picker </Button>

        <div className="picker">
          <InlineDatePicker
            clearable
            ref={(node) => { console.log(node); this.picker = node; }}
            label="Open me from button"
            format="d MMM yyyy"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default withStyles(styles)(ControllingProgrammaticallyExample);

