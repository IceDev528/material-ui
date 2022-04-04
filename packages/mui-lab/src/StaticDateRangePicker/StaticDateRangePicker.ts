/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The StaticDateRangePicker component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`',
        '',
        "You should use `import { StaticDateRangePicker } from '@mui/x-date-pickers-pro'`",
        "or `import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker'`",
        '',
        'More information about this migration on our [blog](https://mui.com/blog/lab-pickers-to-mui-x/)',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type StaticDateRangePickerComponent = (<TDate>(
  props: StaticDateRangePickerProps & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const StaticDateRangePicker = React.forwardRef(function DeprecatedStaticDateRangePicker() {
  warn();

  return null;
}) as StaticDateRangePickerComponent;

StaticDateRangePicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
} as any;

export default StaticDateRangePicker;

export type StaticDateRangePickerProps = Record<any, any>;
