import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from '../wrappers/ModalWrapper';
import TimePicker from './TimePicker';
import PickerBase from '../_shared/PickerBase';
import withUtils from '../_shared/WithUtils';
import DomainPropTypes from '../constants/prop-types';

export class TimePickerWrapper extends PickerBase {
  static propTypes = {
    utils: PropTypes.object.isRequired,
    /** DateTimepicker value */
    value: DomainPropTypes.date,
    /** Date format string for input */
    format: PropTypes.string,
    /** Callback firing when date accepted */
    onChange: PropTypes.func.isRequired,
    /** Auto accept date on minute selection */
    autoOk: PropTypes.bool,
    /** 12h/24h view for hour selection clock */
    ampm: PropTypes.bool,
  }

  static defaultProps = {
    value: new Date(),
    format: undefined,
    autoOk: false,
    ampm: true,
  }

  default12hFormat = 'hh:mm A'
  default24hFormat = 'HH:mm'

  render() {
    const { date } = this.state;
    const {
      value, format, autoOk, onChange, utils, ampm, ...other
    } = this.props;

    return (
      <ModalWrapper
        ref={this.getRef}
        value={value}
        format={this.getFormat()}
        onClear={this.handleClear}
        onAccept={this.handleAccept}
        onChange={this.handleTextFieldChange}
        onDismiss={this.handleDismiss}
        {...other}
      >
        <TimePicker
          date={date}
          onChange={this.handleChange}
          utils={utils}
          ampm={ampm}
        />
      </ModalWrapper>
    );
  }
}

export default withUtils()(TimePickerWrapper);

