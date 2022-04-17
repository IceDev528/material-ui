/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The MobileDateRangePicker component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`',
        '',
        "You should use `import { MobileDateRangePicker } from '@mui/x-date-pickers-pro'`",
        "or `import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type MobileDateRangePickerComponent = (<TDate>(
  props: MobileDateRangePickerProps & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const MobileDateRangePicker = React.forwardRef(function DeprecatedMobileDateRangePicker() {
  warn();

  return null;
}) as MobileDateRangePickerComponent;

MobileDateRangePicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
} as any;

export default MobileDateRangePicker;

export type MobileDateRangePickerProps = Record<any, any>;
