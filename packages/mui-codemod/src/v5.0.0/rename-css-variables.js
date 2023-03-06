const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const JoyComponents = [
  'Alert',
  'AspectRatio',
  'Autocomplete',
  'AutocompleteListbox',
  'AutocompleteOption',
  'Avatar',
  'AvatarGroup',
  'Badge',
  'Box',
  'Breadcrumbs',
  'Button',
  'Card',
  'CardContent',
  'CardCover',
  'CardOverflow',
  'Checkbox',
  'Chip',
  'ChipDelete',
  'CircularProgress',
  'Container',
  'CssBaseline',
  'Divider',
  'FormControl',
  'FormHelperText',
  'FormLabel',
  'Grid',
  'IconButton',
  'Input',
  'LinearProgress',
  'Link',
  'List',
  'ListDivider',
  'ListItem',
  'ListItemButton',
  'ListItemContent',
  'ListItemDecorator',
  'ListSubheader',
  'Menu',
  'MenuItem',
  'MenuList',
  'Modal',
  'ModalClose',
  'ModalDialog',
  'Option',
  'Radio',
  'RadioGroup',
  'ScopedCssBaseline',
  'Select',
  'Sheet',
  'Slider',
  'Stack',
  'SvgIcon',
  'Switch',
  'Tab',
  'Table',
  'TabList',
  'TabPanel',
  'Tabs',
  'Textarea',
  'TextField',
  'Tooltip',
  'Typography',
];

/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return (
    file.source
      // from `--<Component>-<slot>-<property>` to `--<Component>-<slot><Property>`
      .replace(
        /--([a-zA-Z]+)([-_])([a-zA-Z]+)-([a-zA-Z]+)/gm,
        (matched, capture1, capture2, capture3, capture4) => {
          if (!JoyComponents.includes(capture1) && !['internal', 'unstable'].includes(capture1)) {
            return matched;
          }
          // turn `--List-item-...` and `--List-divider-...` to `--ListItem-...` and `--ListDivider-...`
          if (capture1 === 'List' && ['divider', 'item'].includes(capture3)) {
            return `--${capture1}${capitalize(capture3)}-${capture4}`;
          }
          return `--${capture1}${capture2}${capture3}${capitalize(capture4)}`;
        },
      )
      // from `--internal-...` to `--unstable_...`
      .replace(/--internal-/gm, '--unstable_')
  );
}
