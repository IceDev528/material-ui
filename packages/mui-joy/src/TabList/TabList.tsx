import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import useTabsList from '@mui/base/useTabsList';
import { useSlotProps } from '@mui/base/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { useColorInversion } from '../styles/ColorInversion';
import { StyledList } from '../List/List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import SizeTabsContext from '../Tabs/SizeTabsContext';
import { getTabListUtilityClass } from './tabListClasses';
import { TabListProps, TabListOwnerState, TabListTypeMap } from './TabListProps';

const useUtilityClasses = (ownerState: TabListOwnerState) => {
  const { orientation, size, variant, color } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getTabListUtilityClass, {});
};

const TabListRoot = styled(StyledList, {
  name: 'JoyTabList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TabListOwnerState }>(({ theme }) => ({
  flexGrow: 'initial',
  '--List-radius': theme.vars.radius.md, // targets TabList which reuses styles from List.
  '--List-gap': 'var(--Tabs-gap)',
  '--List-padding': 'var(--Tabs-gap)',
  '--List-divider-gap': '0px',
  ...scopedVariables,
}));
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/joy-ui/react-tabs/)
 *
 * API:
 *
 * - [TabList API](https://mui.com/joy-ui/api/tab-list/)
 */
const TabList = React.forwardRef(function TabList(inProps, ref) {
  const props = useThemeProps<typeof inProps & TabListProps>({
    props: inProps,
    name: 'JoyTabList',
  });

  const tabsSize = React.useContext(SizeTabsContext);

  const {
    component = 'div',
    children,
    variant = 'soft',
    color: colorProp = 'neutral',
    size: sizeProp,
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const { isRtl, orientation, getRootProps, processChildren } = useTabsList({ ...props, ref });

  const size = sizeProp ?? tabsSize;

  const ownerState = {
    ...props,
    isRtl,
    orientation,
    variant,
    color,
    size,
    nesting: false,
  };

  const classes = useUtilityClasses(ownerState);

  const tabsListRootProps = useSlotProps({
    elementType: TabListRoot,
    getSlotProps: getRootProps,
    externalSlotProps: {},
    externalForwardedProps: other,
    additionalProps: {
      as: component,
    },
    ownerState,
    className: classes.root,
  });

  const processedChildren = processChildren();

  return (
    // @ts-ignore conflicted ref types
    <TabListRoot {...tabsListRootProps}>
      <ListProvider row={orientation === 'horizontal'} nested>
        {processedChildren}
      </ListProvider>
    </TabListRoot>
  );
}) as OverridableComponent<TabListTypeMap>;

TabList.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the TabList if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default TabList;
