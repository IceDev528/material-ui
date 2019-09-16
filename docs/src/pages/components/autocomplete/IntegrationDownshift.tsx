import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

interface Suggestion {
  label: string;
}

const suggestions: Suggestion[] = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

type RenderInputProps = TextFieldProps & {
  classes: ReturnType<typeof useStyles>;
  ref?: React.Ref<HTMLDivElement>;
};

function renderInput(inputProps: RenderInputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

interface RenderSuggestionProps {
  highlightedIndex: number | null;
  index: number;
  itemProps: MenuItemProps<'div', { button?: never }>;
  selectedItem: Suggestion['label'];
  suggestion: Suggestion;
}

function renderSuggestion(suggestionProps: RenderSuggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(value: string, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

interface DownshiftMultipleProps {
  classes: ReturnType<typeof useStyles>;
}

function DownshiftMultiple(props: DownshiftMultipleProps) {
  const { classes } = props;
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState<Array<Suggestion['label']>>([]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<{ value: string }>) => {
    setInputValue(event.target.value);
  };

  const handleChange = (item: Suggestion['label']) => {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue('');
    setSelectedItem(newSelectedItem);
  };

  const handleDelete = (item: string) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex,
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: 'Select multiple countries',
        });
        return (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              label: 'Countries',
              InputLabelProps: getLabelProps(),
              InputProps: {
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onBlur,
                onChange: event => {
                  handleInputChange(event);
                  onChange!(event as React.ChangeEvent<HTMLInputElement>);
                },
                onFocus,
              },
              inputProps,
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2!).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 250,
    },
    container: {
      flexGrow: 1,
      position: 'relative',
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0,
    },
    chip: {
      margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
      flexWrap: 'wrap',
    },
    inputInput: {
      width: 'auto',
      flexGrow: 1,
    },
    divider: {
      height: theme.spacing(2),
    },
  }),
);

let popperNode: HTMLDivElement | null | undefined;

export default function IntegrationDownshift() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Downshift id="downshift-simple">
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: 'Search for a country (start with a)',
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: 'Country',
                InputLabelProps: getLabelProps({ shrink: true } as any),
                InputProps: { onBlur, onFocus },
                inputProps,
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue!).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem,
                      }),
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
      <div className={classes.divider} />
      <DownshiftMultiple classes={classes} />
      <div className={classes.divider} />
      <Downshift id="downshift-popper">
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: 'With Popper',
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: 'Country',
                InputProps: { onBlur, onFocus },
                InputLabelProps: getLabelProps({ shrink: true } as any),
                inputProps,
                ref: node => {
                  popperNode = node;
                },
              })}
              <Popper open={isOpen} anchorEl={popperNode}>
                <div {...(isOpen ? getMenuProps({}, { suppressRefError: true }) : {})}>
                  <Paper
                    square
                    style={{ marginTop: 8, width: popperNode ? popperNode.clientWidth : undefined }}
                  >
                    {getSuggestions(inputValue!).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem,
                      }),
                    )}
                  </Paper>
                </div>
              </Popper>
            </div>
          );
        }}
      </Downshift>
      <div className={classes.divider} />
      <Downshift id="downshift-options">
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          openMenu,
          selectedItem,
        }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value === '') {
                clearSelection();
              }
            },
            onFocus: openMenu,
            placeholder: 'With the clear & show empty options',
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: 'Countries',
                InputLabelProps: getLabelProps({ shrink: true } as any),
                InputProps: { onBlur, onChange, onFocus },
                inputProps,
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue!, { showEmpty: true }).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem,
                      }),
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}
