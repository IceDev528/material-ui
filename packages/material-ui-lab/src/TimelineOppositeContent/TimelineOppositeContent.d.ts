import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { InternalStandardProps as StandardProps, TypographyProps } from '@material-ui/core';
import { TimelineOppositeContentClasses } from './timelineOppositeContentClasses';

export interface TimelineOppositeContentProps extends StandardProps<TypographyProps> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TimelineOppositeContentClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineOppositeContent API](https://material-ui.com/api/timeline-opposite-content/)
 * - inherits [Typography API](https://material-ui.com/api/typography/)
 */
declare const TimelineOppositeContent: ((props: TimelineOppositeContentProps) => JSX.Element) & {
  muiName: string;
};

export default TimelineOppositeContent;
