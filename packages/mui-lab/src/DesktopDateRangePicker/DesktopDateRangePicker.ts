/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DesktopDateRangePicker component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`',
        '',
        "You should use `import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro'`",
        "or `import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker'`",
        '',
        'More information about this migration on our [blog](https://mui.com/blog/lab-pickers-to-mui-x/)',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DesktopDateRangePickerComponent = (<TDate>(
  props: DesktopDateRangePickerProps & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const DesktopDateRangePicker = React.forwardRef(function DeprecatedDesktopDateRangePicker() {
  warn();

  return null;
}) as DesktopDateRangePickerComponent;

DesktopDateRangePicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
} as any;

export default DesktopDateRangePicker;

export type DesktopDateRangePickerProps = Record<any, any>;
