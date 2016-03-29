import React from 'react';
import transitions from '../styles/transitions';
import SlideInTransitionGroup from '../internal/SlideIn';

function getStyles(props, context, state) {
  const {datePicker} = context.muiTheme;
  const {selectedYear} = state;

  const styles = {
    root: {
      backgroundColor: datePicker.selectColor,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      color: datePicker.textColor,
      height: 60,
      padding: 20,
    },
    monthDay: {
      display: 'inline-block',
      fontSize: 36,
      fontWeight: '400',
      lineHeight: '36px',
      height: props.mode === 'landscape' ? 76 : 38,
      opacity: selectedYear ? 0.7 : 1,
      transition: transitions.easeOut(),
      width: '100%',
    },
    monthDayTitle: {
      cursor: !selectedYear ? 'default' : 'pointer',
    },
    year: {
      margin: 0,
      fontSize: 16,
      fontWeight: '400',
      lineHeight: '16px',
      height: 16,
      opacity: selectedYear ? 1 : 0.7,
      transition: transitions.easeOut(),
      marginBottom: 10,
    },
    yearTitle: {
      cursor: (!selectedYear && !props.disableYearSelection) ? 'pointer' : 'default',
    },
  };

  return styles;
}

const DateDisplay = React.createClass({

  propTypes: {
    DateTimeFormat: React.PropTypes.func.isRequired,
    disableYearSelection: React.PropTypes.bool,
    locale: React.PropTypes.string.isRequired,
    mode: React.PropTypes.oneOf(['portrait', 'landscape']),
    monthDaySelected: React.PropTypes.bool,
    onTouchTapMonthDay: React.PropTypes.func,
    onTouchTapYear: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
    weekCount: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      disableYearSelection: false,
      monthDaySelected: true,
      weekCount: 4,
    };
  },

  getInitialState() {
    return {
      selectedYear: !this.props.monthDaySelected,
      transitionDirection: 'up',
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate !== this.props.selectedDate) {
      const direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction,
      });
    }

    if (nextProps.monthDaySelected !== undefined) {
      this.setState({
        selectedYear: !nextProps.monthDaySelected,
      });
    }
  },

  handleTouchTapMonthDay() {
    if (this.props.onTouchTapMonthDay && this.state.selectedYear) {
      this.props.onTouchTapMonthDay();
    }

    this.setState({selectedYear: false});
  },

  handleTouchTapYear() {
    if (this.props.onTouchTapYear && !this.props.disableYearSelection && !this.state.selectedYear) {
      this.props.onTouchTapYear();
    }

    if (!this.props.disableYearSelection) {
      this.setState({selectedYear: true});
    }
  },

  render() {
    const {
      DateTimeFormat,
      locale,
      selectedDate,
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const year = selectedDate.getFullYear();
    const styles = getStyles(this.props, this.context, this.state);

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'short',
      weekday: 'short',
      day: '2-digit',
    }).format(selectedDate);

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        <SlideInTransitionGroup
          style={styles.year}
          direction={this.state.transitionDirection}
        >
          <div key={year} style={styles.yearTitle} onTouchTap={this.handleTouchTapYear}>
            {year}
          </div>
        </SlideInTransitionGroup>
        <SlideInTransitionGroup
          style={styles.monthDay}
          direction={this.state.transitionDirection}
        >
          <div
            key={dateTimeFormatted}
            style={styles.monthDayTitle}
            onTouchTap={this.handleTouchTapMonthDay}
          >
            {dateTimeFormatted}
          </div>
        </SlideInTransitionGroup>
      </div>
    );
  },

});

export default DateDisplay;
