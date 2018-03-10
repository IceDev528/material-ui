import moment from 'moment';

export default class MomentUtils {
  constructor(locale) {
    this.locale = locale;
  }

  parse = moment

  date(value, formatString) {
    return moment(value, formatString);
  }

  isValid(date) {
    return date.isValid();
  }

  isNull(date) {
    return date.parsingFlags().nullInput;
  }

  isAfter(date, value) {
    return date.isAfter(value);
  }

  isBefore(date, value) {
    return date.isBefore(value);
  }

  isAfterDay(date, value) {
    return date.isAfter(value, 'day');
  }

  isBeforeDay(date, value) {
    return date.isBefore(value, 'day');
  }

  isBeforeYear(date, value) {
    return date.isBefore(value, 'year');
  }

  isAfterYear(date, value) {
    return date.isAfter(value, 'year');
  }

  startOfDay(date) {
    return date.clone().startOf('day');
  }

  endOfDay(date) {
    return date.clone().endOf('day');
  }

  format(date, formatString) {
    return date.format(formatString);
  }

  formatNumber(num) {
    return num;
  }

  getHours(date) {
    return date.get('hours');
  }

  addDays(date, count) {
    return count < 0
      ? date.clone().subtract(Math.abs(count), 'days')
      : date.clone().add(count, 'days');
  }

  setHours(date, value) {
    return date.clone().hours(value);
  }

  getMinutes(date) {
    return date.get('minutes');
  }

  setMinutes(date, value) {
    return date.clone().minutes(value);
  }

  getMonth(date) {
    return date.get('month');
  }

  isSameDay(date, comparing) {
    return date.isSame(comparing, 'day');
  }

  getMeridiemText(ampm) {
    return ampm === 'am' ? 'AM' : 'PM';
  }

  getStartOfMonth(date) {
    return date.clone().startOf('month');
  }

  getNextMonth(date) {
    return date.clone().add(1, 'month');
  }

  getPreviousMonth(date) {
    return date.clone().subtract(1, 'month');
  }

  getYear(date) {
    return date.get('year');
  }

  setYear(date, year) {
    return date.clone().set('year', year);
  }

  getWeekdays() {
    return [0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => moment().weekday(dayOfWeek).format('dd')[0]);
  }

  isEqual(value, comparing) {
    return moment(value).isSame(comparing);
  }

  getWeekArray(date) {
    const start = date.clone().startOf('month').startOf('week');
    const end = date.clone().endOf('month').endOf('week');

    const nestedWeeks = [];
    let count = 0;
    let current = start;
    while (current.isBefore(end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);
      current = current.clone().add(1, 'day');
      count += 1;
    }

    return nestedWeeks;
  }

  getYearRange(start, end) {
    const startDate = moment(start);
    const endDate = moment(end);
    const years = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, 'year');
    }

    return years;
  }

  // displaying methods
  getCalendarHeaderText(date) {
    return date.format('MMMM YYYY');
  }

  getYearText(date) {
    return date.format('YYYY');
  }

  getDatePickerHeaderText(date) {
    return date.format('ddd, MMM D');
  }

  getDateTimePickerHeaderText(date) {
    return date.format('MMM D');
  }

  getDayText(date) {
    return date.format('D');
  }

  getHourText(date, ampm) {
    return date.format(ampm ? 'hh' : 'HH');
  }

  getMinuteText(date) {
    return date.format('mm');
  }
}
