import * as PropTypes from 'prop-types';

export const date = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date),
]);

const datePickerView = PropTypes.oneOf(['year', 'month', 'day']);

export type ParsableDate<TDate = unknown> = string | number | Date | null | undefined | TDate;

export const DomainPropTypes = { date, datePickerView };

export const defaultMinDate = new Date('1900-01-01') as unknown;

export const defaultMaxDate = new Date('2099-12-31') as unknown;
