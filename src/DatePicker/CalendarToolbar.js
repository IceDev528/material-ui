import React from 'react';
import IconButton from '../IconButton';
import Toolbar from '../Toolbar/Toolbar';
import ToolbarGroup from '../Toolbar/ToolbarGroup';
import NavigationChevronLeft from '../svg-icons/navigation/chevron-left';
import NavigationChevronRight from '../svg-icons/navigation/chevron-right';
import SlideInTransitionGroup from '../internal/SlideIn';

const styles = {
  root: {
    position: 'relative',
    padding: 0,
    backgroundColor: 'inherit',
  },
  title: {
    position: 'absolute',
    top: 17,
    lineHeight: '14px',
    fontSize: 14,
    height: 14,
    width: '100%',
    fontWeight: '500',
    textAlign: 'center',
  },
};

const CalendarToolbar = React.createClass({

  propTypes: {
    DateTimeFormat: React.PropTypes.func.isRequired,
    displayDate: React.PropTypes.object.isRequired,
    locale: React.PropTypes.string.isRequired,
    nextMonth: React.PropTypes.bool,
    onMonthChange: React.PropTypes.func,
    prevMonth: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      nextMonth: true,
      prevMonth: true,
    };
  },

  getInitialState() {
    return {
      transitionDirection: 'up',
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.displayDate !== this.props.displayDate) {
      const direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction,
      });
    }
  },

  handleTouchTapPrevMonth() {
    if (this.props.onMonthChange && this.props.prevMonth) this.props.onMonthChange(-1);
  },

  handleTouchTapNextMonth() {
    if (this.props.onMonthChange && this.props.nextMonth) this.props.onMonthChange(1);
  },

  render() {
    const {
      DateTimeFormat,
      locale,
      displayDate,
    } = this.props;

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(displayDate);

    const nextButtonIcon = this.context.muiTheme.isRtl ? <NavigationChevronRight /> : <NavigationChevronLeft />;
    const prevButtonIcon = this.context.muiTheme.isRtl ? <NavigationChevronLeft /> : <NavigationChevronRight />;

    return (
      <Toolbar style={styles.root} noGutter={true}>
        <SlideInTransitionGroup
          style={styles.title}
          direction={this.state.transitionDirection}
        >
          <div key={dateTimeFormatted}>{dateTimeFormatted}</div>
        </SlideInTransitionGroup>
        <ToolbarGroup key={0} float="left">
          <IconButton
            style={styles.button}
            disabled={!this.props.prevMonth}
            onTouchTap={this.handleTouchTapPrevMonth}
          >
            {nextButtonIcon}
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
          <IconButton
            style={styles.button}
            disabled={!this.props.nextMonth}
            onTouchTap={this.handleTouchTapNextMonth}
          >
            {prevButtonIcon}
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    );
  },

});

export default CalendarToolbar;
