import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import classnames from 'classnames';
import { extendMoment } from 'moment-range';
import { withStyles } from 'material-ui';
import DomainPropTypes from '../constants/prop-types';

const moment = extendMoment(Moment);

export class YearSelection extends PureComponent {
  static propTypes = {
    date: PropTypes.shape({}).isRequired,
    minDate: DomainPropTypes.date.isRequired,
    maxDate: DomainPropTypes.date.isRequired,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disableFuture: PropTypes.bool.isRequired,
    animateYearScrolling: PropTypes.bool,
  }

  static defaultProps = {
    animateYearScrolling: false,
  }

  componentDidMount = () => {
    this.scrollToCurrentYear();
  }

  onYearSelect = (year) => {
    const { date, onChange } = this.props;

    const newDate = date.clone().set('year', year);
    onChange(newDate);
  }

  scrollToCurrentYear = () => {
    const { animateYearScrolling, classes } = this.props;
    const currentYearElement = document.getElementsByClassName(classes.selectedYear)[0];

    if (currentYearElement) {
      currentYearElement.scrollIntoView({
        behavior: animateYearScrolling ? 'smooth' : 'auto',
      });
    }
  }

  render() {
    const {
      minDate, maxDate, date, classes, disableFuture,
    } = this.props;
    const currentYear = date.get('year');

    return (
      <div className={classes.container}>
        {
          Array.from(moment.range(minDate, maxDate).by('year'))
            .map((year) => {
              const yearNumber = year.get('year');
              const className = classnames(classes.yearItem, {
                [classes.selectedYear]: yearNumber === currentYear,
                [classes.disabled]: disableFuture && year.isAfter(moment()),
              });

              return (
                <div
                  role="button"
                  key={year.format('YYYY')}
                  className={className}
                  tabIndex={yearNumber}
                  onClick={() => this.onYearSelect(yearNumber)}
                  onKeyPress={() => this.onYearSelect(yearNumber)}
                >
                  { yearNumber }
                </div>
              );
            })
        }
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    maxHeight: 320,
    overflowY: 'auto',
    justifyContent: 'center',
  },
  yearItem: {
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    outline: 'none',
    color: theme.palette.text.primary,
  },
  selectedYear: {
    fontSize: 26,
    margin: '10px 0',
    color: theme.palette.primary[500],
  },
  disabled: {
    pointerEvents: 'none',
    color: theme.palette.text.hint,
  },
});

export default withStyles(styles, { name: 'MuiPickersYearSelection' })(YearSelection);
