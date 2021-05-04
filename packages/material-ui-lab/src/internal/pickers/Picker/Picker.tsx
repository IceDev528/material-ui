import * as React from 'react';
import clsx from 'clsx';
import {
  MuiStyles,
  WithStyles,
  experimentalStyled as styled,
  withStyles,
} from '@material-ui/core/styles';
import { useViews } from '../hooks/useViews';
import ClockPicker from '../../../ClockPicker/ClockPicker';
import { ClockPickerView } from '../../../ClockPicker';
import CalendarPicker, { CalendarPickerView } from '../../../CalendarPicker';
import { KeyboardDateInput } from '../KeyboardDateInput';
import { useIsLandscape } from '../hooks/useIsLandscape';
import { WrapperVariant, WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import { DateInputPropsLike } from '../wrappers/WrapperProps';
import { PickerSelectionState } from '../hooks/usePickerState';
import { BasePickerProps, CalendarAndClockProps } from '../typings/BasePicker';
import { AllAvailableViews } from '../typings/Views';
import PickerView from './PickerView';

export interface ExportedPickerProps
  extends Omit<BasePickerProps<unknown, unknown>, 'value' | 'onChange'>,
    CalendarAndClockProps<unknown> {
  dateRangeIcon?: React.ReactNode;
  /**
   * First view to show.
   */
  openTo?: AllAvailableViews;
  timeIcon?: React.ReactNode;
  /**
   * Array of views to show.
   */
  views?: readonly AllAvailableViews[];
}

export interface PickerProps<TDateValue = any> extends ExportedPickerProps {
  date: TDateValue;
  DateInputProps: DateInputPropsLike;
  isMobileKeyboardViewOpen: boolean;
  onDateChange: (
    date: TDateValue,
    currentWrapperVariant: WrapperVariant,
    isFinish?: PickerSelectionState,
  ) => void;
  toggleMobileKeyboardView: () => void;
}

export const MobileKeyboardInputView = styled('div')({
  padding: '16px 24px',
});

export type PickerClassKey = 'root' | 'landscape';

export const styles: MuiStyles<PickerClassKey> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  landscape: {
    flexDirection: 'row',
  },
};

const MobileKeyboardTextFieldProps = { fullWidth: true };

const isDatePickerView = (view: AllAvailableViews): view is CalendarPickerView =>
  view === 'year' || view === 'month' || view === 'day';

const isTimePickerView = (view: AllAvailableViews): view is ClockPickerView =>
  view === 'hours' || view === 'minutes' || view === 'seconds';

function Picker({
  classes,
  className,
  date,
  DateInputProps,
  isMobileKeyboardViewOpen,
  onDateChange,
  openTo = 'day',
  orientation,
  showToolbar,
  toggleMobileKeyboardView,
  ToolbarComponent = () => null,
  toolbarFormat,
  toolbarPlaceholder,
  toolbarTitle,
  views = ['year', 'month', 'day', 'hours', 'minutes', 'seconds'],
  ...other
}: PickerProps & WithStyles<typeof styles>) {
  const isLandscape = useIsLandscape(views, orientation);
  const wrapperVariant = React.useContext(WrapperVariantContext);

  const toShowToolbar =
    typeof showToolbar === 'undefined' ? wrapperVariant !== 'desktop' : showToolbar;

  const handleDateChange = React.useCallback(
    (newDate: unknown, selectionState?: PickerSelectionState) => {
      onDateChange(newDate, wrapperVariant, selectionState);
    },
    [onDateChange, wrapperVariant],
  );

  const handleViewChange = React.useCallback(() => {
    if (isMobileKeyboardViewOpen) {
      toggleMobileKeyboardView();
    }
  }, [isMobileKeyboardViewOpen, toggleMobileKeyboardView]);

  const { openView, nextView, previousView, setOpenView, handleChangeAndOpenNext } = useViews({
    view: undefined,
    views,
    openTo,
    onChange: handleDateChange,
    onViewChange: handleViewChange,
  });

  return (
    <div
      className={clsx(classes.root, className, {
        [classes.landscape]: isLandscape,
      })}
    >
      {toShowToolbar && (
        <ToolbarComponent
          {...other}
          views={views}
          isLandscape={isLandscape}
          date={date}
          onChange={handleDateChange}
          setOpenView={setOpenView}
          openView={openView}
          toolbarTitle={toolbarTitle}
          toolbarFormat={toolbarFormat}
          toolbarPlaceholder={toolbarPlaceholder}
          isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
          toggleMobileKeyboardView={toggleMobileKeyboardView}
        />
      )}

      <PickerView>
        {isMobileKeyboardViewOpen ? (
          <MobileKeyboardInputView>
            <KeyboardDateInput
              {...DateInputProps}
              ignoreInvalidInputs
              disableOpenPicker
              TextFieldProps={MobileKeyboardTextFieldProps}
            />
          </MobileKeyboardInputView>
        ) : (
          <React.Fragment>
            {isDatePickerView(openView) && (
              <CalendarPicker
                date={date}
                onViewChange={setOpenView}
                onChange={handleChangeAndOpenNext}
                view={openView}
                views={views.filter(isDatePickerView)}
                {...other}
              />
            )}

            {isTimePickerView(openView) && (
              <ClockPicker
                {...other}
                date={date}
                view={openView}
                onChange={handleChangeAndOpenNext}
                openNextView={() => setOpenView(nextView)}
                openPreviousView={() => setOpenView(previousView)}
                nextViewAvailable={!nextView}
                previousViewAvailable={!previousView || isDatePickerView(previousView)}
                showViewSwitcher={wrapperVariant === 'desktop'}
              />
            )}
          </React.Fragment>
        )}
      </PickerView>
    </div>
  );
}

export default withStyles(styles, { name: 'MuiPicker' })(Picker);
