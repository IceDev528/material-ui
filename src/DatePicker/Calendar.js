import React from 'react';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import transitions from '../styles/transitions';
import CalendarMonth from './CalendarMonth';
import CalendarYear from './CalendarYear';
import CalendarToolbar from './CalendarToolbar';
import DateDisplay from './DateDisplay';
import SlideInTransitionGroup from '../internal/SlideIn';
import ClearFix from '../internal/ClearFix';

import {
  addDays,
  addMonths,
  addYears,
  cloneDate,
  isAfterDate,
  isBeforeDate,
  getWeekArray,
  getFirstDayOfMonth,
  localizedWeekday,
  monthDiff,
  yearDiff,
} from './dateUtils';

const daysArray = [...Array(7)];

const Calendar = React.createClass({

  propTypes: {
    DateTimeFormat: React.PropTypes.func.isRequired,
    disableYearSelection: React.PropTypes.bool,
    firstDayOfWeek: React.PropTypes.number,
    initialDate: React.PropTypes.object,
    locale: React.PropTypes.string.isRequired,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['portrait', 'landscape']),
    onDayTouchTap: React.PropTypes.func,
    open: React.PropTypes.bool,
    shouldDisableDate: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      disableYearSelection: false,
      initialDate: new Date(),
      minDate: addYears(new Date(), -100),
      maxDate: addYears(new Date(), 100),
    };
  },

  getInitialState() {
    return {
      displayDate: getFirstDayOfMonth(this.props.initialDate),
      displayMonthDay: true,
      selectedDate: this.props.initialDate,
      transitionDirection: 'left',
      transitionEnter: true,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      const d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: getFirstDayOfMonth(d),
        selectedDate: d,
      });
    }
  },

  _yearSelector() {
    if (this.props.disableYearSelection) return;

    return (
      <CalendarYear
        key={'years'}
        displayDate={this.state.displayDate}
        onYearTouchTap={this.handleYearTouchTap}
        selectedDate={this.state.selectedDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
      />
    );
  },

  getSelectedDate() {
    return this.state.selectedDate;
  },

  isSelectedDateDisabled() {
    if (!this.state.displayMonthDay) {
      return false;
    }

    return this.refs.calendar.isSelectedDateDisabled();
  },

  _addSelectedDays(days) {
    this._setSelectedDate(addDays(this.state.selectedDate, days));
  },

  _addSelectedMonths(months) {
    this._setSelectedDate(addMonths(this.state.selectedDate, months));
  },

  _addSelectedYears(years) {
    this._setSelectedDate(addYears(this.state.selectedDate, years));
  },

  _setDisplayDate(d, newSelectedDate) {
    const newDisplayDate = getFirstDayOfMonth(d);
    const direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate,
      });
    }
  },

  _setSelectedDate(date) {
    let adjustedDate = date;
    if (isBeforeDate(date, this.props.minDate)) {
      adjustedDate = this.props.minDate;
    } else if (isAfterDate(date, this.props.maxDate)) {
      adjustedDate = this.props.maxDate;
    }

    const newDisplayDate = getFirstDayOfMonth(adjustedDate);
    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, adjustedDate);
    } else {
      this.setState({
        selectedDate: adjustedDate,
      });
    }
  },

  handleDayTouchTap(event, date) {
    this._setSelectedDate(date);
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(event, date);
  },

  handleMonthChange(months) {
    this.setState({
      transitionDirection: months >= 0 ? 'left' : 'right',
      displayDate: addMonths(this.state.displayDate, months),
    });
  },

  handleYearTouchTap(event, year) {
    const date = cloneDate(this.state.selectedDate);
    date.setFullYear(year);
    this._setSelectedDate(date, event);
  },

  _getToolbarInteractions() {
    return {
      prevMonth: monthDiff(this.state.displayDate, this.props.minDate) > 0,
      nextMonth: monthDiff(this.state.displayDate, this.props.maxDate) < 0,
    };
  },

  handleTouchTapMonthDay() {
    this.setState({
      displayMonthDay: true,
    });
  },

  handleTouchTapClick() {
    this.setState({
      displayMonthDay: false,
    });
  },

  handleKeyDown(event) {
    if (this.props.open) {
      switch (keycode(event)) {
        case 'up':
          if (event.altKey && event.shiftKey) {
            this._addSelectedYears(-1);
          } else if (event.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-7);
          }
          break;

        case 'down':
          if (event.altKey && event.shiftKey) {
            this._addSelectedYears(1);
          } else if (event.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(7);
          }
          break;

        case 'right':
          if (event.altKey && event.shiftKey) {
            this._addSelectedYears(1);
          } else if (event.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(1);
          }
          break;

        case 'left':
          if (event.altKey && event.shiftKey) {
            this._addSelectedYears(-1);
          } else if (event.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-1);
          }
          break;
      }
    }
  },

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const yearCount = yearDiff(this.props.maxDate, this.props.minDate) + 1;
    const weekCount = getWeekArray(this.state.displayDate, this.props.firstDayOfWeek).length;
    const toolbarInteractions = this._getToolbarInteractions();
    const isLandscape = this.props.mode === 'landscape';
    const styles = {
      root: {
        fontSize: 12,
      },
      calendarContainer: {
        width: isLandscape ? 320 : '100%',
        height: weekCount === 5 ? 284 :
          weekCount === 6 ? 324 : 244,
        float: isLandscape ? 'right' : 'none',
        transition: transitions.easeOut('150ms', 'height'),
        overflow: 'hidden',
      },
      yearContainer: {
        width: 280,
        overflow: 'hidden',
        height: yearCount < 6 ? yearCount * 56 + 10 :
          weekCount === 5 ? 284 :
          weekCount === 6 ? 324 : 244,
        float: isLandscape ? 'right' : 'none',
      },
      dateDisplay: {
        width: isLandscape ? 120 : '',
        height: isLandscape ?
          weekCount === 5 ? 238 :
          weekCount === 6 ? 278 :
          198 : 'auto',
        float: isLandscape ? 'left' : 'none',
      },
      weekTitle: {
        padding: '0 14px',
        lineHeight: '12px',
        opacity: '0.5',
        height: 12,
        fontWeight: '500',
        margin: 0,
      },
      weekTitleDay: {
        listStyle: 'none',
        float: 'left',
        width: 37,
        textAlign: 'center',
        margin: '0 2px',
      },
    };

    const weekTitleDayStyle = prepareStyles(styles.weekTitleDay);
    const {
      DateTimeFormat,
      locale,
      firstDayOfWeek,
    } = this.props;

    return (
      <ClearFix style={styles.root}>
        <EventListener
          elementName="window"
          onKeyDown={this.handleKeyDown}
        />
        <DateDisplay
          DateTimeFormat={DateTimeFormat}
          locale={locale}
          disableYearSelection={this.props.disableYearSelection}
          style={styles.dateDisplay}
          selectedDate={this.state.selectedDate}
          onTouchTapMonthDay={this.handleTouchTapMonthDay}
          onTouchTapYear={this.handleTouchTapClick}
          monthDaySelected={this.state.displayMonthDay}
          mode={this.props.mode}
          weekCount={weekCount}
        />
        {this.state.displayMonthDay &&
          <div style={prepareStyles(styles.calendarContainer)}>
            <CalendarToolbar
              DateTimeFormat={DateTimeFormat}
              locale={locale}
              displayDate={this.state.displayDate}
              onMonthChange={this.handleMonthChange}
              prevMonth={toolbarInteractions.prevMonth}
              nextMonth={toolbarInteractions.nextMonth}
            />
            <ClearFix
              elementType="ul"
              style={styles.weekTitle}
            >
              {daysArray.map((event, i) => (
                <li key={i} style={weekTitleDayStyle}>
                  {localizedWeekday(DateTimeFormat, locale, i, firstDayOfWeek)}
                </li>
              ))}
            </ClearFix>
            <SlideInTransitionGroup direction={this.state.transitionDirection}>
              <CalendarMonth
                key={this.state.displayDate.toDateString()}
                ref="calendar"
                displayDate={this.state.displayDate}
                onDayTouchTap={this.handleDayTouchTap}
                selectedDate={this.state.selectedDate}
                minDate={this.props.minDate}
                maxDate={this.props.maxDate}
                shouldDisableDate={this.props.shouldDisableDate}
                firstDayOfWeek={this.props.firstDayOfWeek}
              />
            </SlideInTransitionGroup>
          </div>
        }
        {!this.state.displayMonthDay &&
          <div style={prepareStyles(styles.yearContainer)}>
            {this._yearSelector()}
          </div>
        }
      </ClearFix>
    );
  },

});

export default Calendar;
