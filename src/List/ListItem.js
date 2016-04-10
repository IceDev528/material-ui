import React from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import ColorManipulator from '../utils/colorManipulator';
import transitions from '../styles/transitions';
import EnhancedButton from '../internal/EnhancedButton';
import IconButton from '../IconButton';
import OpenIcon from '../svg-icons/navigation/expand-less';
import CloseIcon from '../svg-icons/navigation/expand-more';
import NestedList from './NestedIist';

function getStyles(props, context, state) {
  const {
    insetChildren,
    leftAvatar,
    leftCheckbox,
    leftIcon,
    nestedLevel,
    rightAvatar,
    rightIcon,
    rightIconButton,
    rightToggle,
    secondaryText,
    secondaryTextLines,
  } = props;

  const {muiTheme} = context;
  const {listItem} = muiTheme;

  const textColor = muiTheme.baseTheme.palette.textColor;
  const hoverColor = ColorManipulator.fade(textColor, 0.1);
  const singleAvatar = !secondaryText && (leftAvatar || rightAvatar);
  const singleNoAvatar = !secondaryText && !(leftAvatar || rightAvatar);
  const twoLine = secondaryText && secondaryTextLines === 1;
  const threeLine = secondaryText && secondaryTextLines > 1;

  const styles = {
    root: {
      backgroundColor: (state.isKeyboardFocused || state.hovered) &&
      !state.rightIconButtonHovered &&
      !state.rightIconButtonKeyboardFocused ? hoverColor : null,
      color: textColor,
      display: 'block',
      fontSize: 16,
      lineHeight: '16px',
      position: 'relative',
      transition: transitions.easeOut(),
    },

    // This inner div is needed so that ripples will span the entire container
    innerDiv: {
      marginLeft: nestedLevel * muiTheme.listItem.nestedLevelDepth,
      paddingLeft: leftIcon || leftAvatar || leftCheckbox || insetChildren ? 72 : 16,
      paddingRight: rightIcon || rightAvatar || rightIconButton ? 56 : rightToggle ? 72 : 16,
      paddingBottom: singleAvatar ? 20 : 16,
      paddingTop: singleNoAvatar || threeLine ? 16 : 20,
      position: 'relative',
    },

    icons: {
      height: 24,
      width: 24,
      display: 'block',
      position: 'absolute',
      top: twoLine ? 12 : singleAvatar ? 4 : 0,
      margin: 12,
    },

    leftIcon: {
      color: listItem.leftIconColor,
      fill: listItem.leftIconColor,
      left: 4,
    },

    rightIcon: {
      color: listItem.rightIconColor,
      fill: listItem.rightIconColor,
      right: 4,
    },

    avatars: {
      position: 'absolute',
      top: singleAvatar ? 8 : 16,
    },

    label: {
      cursor: 'pointer',
    },

    leftAvatar: {
      left: 16,
    },

    rightAvatar: {
      right: 16,
    },

    leftCheckbox: {
      position: 'absolute',
      display: 'block',
      width: 24,
      top: twoLine ? 24 : singleAvatar ? 16 : 12,
      left: 16,
    },

    primaryText: {
    },

    rightIconButton: {
      position: 'absolute',
      display: 'block',
      top: twoLine ? 12 : singleAvatar ? 4 : 0,
      right: 4,
    },

    rightToggle: {
      position: 'absolute',
      display: 'block',
      width: 54,
      top: twoLine ? 25 : singleAvatar ? 17 : 13,
      right: 8,
    },

    secondaryText: {
      fontSize: 14,
      lineHeight: threeLine ? '18px' : '16px',
      height: threeLine ? 36 : 16,
      margin: 0,
      marginTop: 4,
      color: listItem.secondaryTextColor,

      // needed for 2 and 3 line ellipsis
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: threeLine ? null : 'nowrap',
      display: threeLine ? '-webkit-box' : null,
      WebkitLineClamp: threeLine ? 2 : null,
      WebkitBoxOrient: threeLine ? 'vertical' : null,
    },
  };

  return styles;
}

class ListItem extends React.Component {
  static muiName = 'ListItem';

  static propTypes = {
    /**
     * If true, generate a nested-list-indicator icon when nested list
     * items are detected. Note that an indicator will not be created
     * if a `rightIcon` or `rightIconButton` has been provided to
     * the element.
     */
    autoGenerateNestedIndicator: React.PropTypes.bool,

    /**
     * Children passed into the `ListItem`.
     */
    children: React.PropTypes.node,

    /**
     * If true, the element will not be able to be focused by the keyboard.
     */
    disableKeyboardFocus: React.PropTypes.bool,

    /**
     * If true, the element will not be clickable
     * and will not display hover effects.
     * This is automatically disabled if either `leftCheckbox`
     * or `rightToggle` is set.
     */
    disabled: React.PropTypes.bool,

    /**
     * If true, the nested `ListItem`s are initially displayed.
     */
    initiallyOpen: React.PropTypes.bool,

    /**
     * Override the inline-styles of the inner div element.
     */
    innerDivStyle: React.PropTypes.object,

    /**
     * If true, the children will be indented by 72px.
     * This is useful if there is no left avatar or left icon.
     */
    insetChildren: React.PropTypes.bool,

    /**
     * This is the `Avatar` element to be displayed on the left side.
     */
    leftAvatar: React.PropTypes.element,

    /**
     * This is the `Checkbox` element to be displayed on the left side.
     */
    leftCheckbox: React.PropTypes.element,

    /**
     * This is the `SvgIcon` or `FontIcon` to be displayed on the left side.
     */
    leftIcon: React.PropTypes.element,

    /**
     * An array of `ListItem`s to nest underneath the current `ListItem`.
     */
    nestedItems: React.PropTypes.arrayOf(React.PropTypes.element),

    /**
     * Controls how deep a `ListItem` appears.
     * This property is automatically managed, so modify at your own risk.
     */
    nestedLevel: React.PropTypes.number,

    /**
     * Override the inline-styles of the nested items' `NestedList`.
     */
    nestedListStyle: React.PropTypes.object,

    /**
     * Callback function fired when the `ListItem` is focused or blurred by the keyboard.
     *
     * @param {object} event `focus` or `blur` event targeting the `ListItem`.
     * @param {boolean} isKeyboardFocused If true, the `ListItem` is focused.
     */
    onKeyboardFocus: React.PropTypes.func,

    /**
     * Callback function fired when the mouse enters the `ListItem`.
     *
     * @param {object} event `mouseenter` event targeting the `ListItem`.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Callback function fired when the mouse leaves the `ListItem`.
     *
     * @param {object} event `mouseleave` event targeting the `ListItem`.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Callbak function fired when the `ListItem` toggles its nested list.
     *
     * @param {object} listItem The `ListItem`.
     */
    onNestedListToggle: React.PropTypes.func,

    /**
     * Callback function fired when the `ListItem` is touched.
     *
     * @param {object} event `touchstart` event targeting the `ListItem`.
     */
    onTouchStart: React.PropTypes.func,

    /**
     * Callback function fired when the `ListItem` is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the `ListItem`.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * This is the block element that contains the primary text.
     * If a string is passed in, a div tag will be rendered.
     */
    primaryText: React.PropTypes.node,

    /**
     * If true, clicking or tapping the primary text of the `ListItem`
     * toggles the nested list.
     */
    primaryTogglesNestedList: React.PropTypes.bool,

    /**
     * This is the `Avatar` element to be displayed on the right side.
     */
    rightAvatar: React.PropTypes.element,

    /**
     * This is the `SvgIcon` or `FontIcon` to be displayed on the right side.
     */
    rightIcon: React.PropTypes.element,

    /**
     * This is the `IconButton` to be displayed on the right side.
     * Hovering over this button will remove the `ListItem` hover.
     * Also, clicking on this button will not trigger a
     * ripple on the `ListItem`; the event will be stopped and prevented
     * from bubbling up to cause a `ListItem` click.
     */
    rightIconButton: React.PropTypes.element,

    /**
     * This is the `Toggle` element to display on the right side.
     */
    rightToggle: React.PropTypes.element,

    /**
     * This is the block element that contains the secondary text.
     * If a string is passed in, a div tag will be rendered.
     */
    secondaryText: React.PropTypes.node,

    /**
     * Can be 1 or 2. This is the number of secondary
     * text lines before ellipsis will show.
     */
    secondaryTextLines: React.PropTypes.oneOf([1, 2]),

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  };

  static defaultProps = {
    autoGenerateNestedIndicator: true,
    disableKeyboardFocus: false,
    disabled: false,
    initiallyOpen: false,
    insetChildren: false,
    nestedItems: [],
    nestedLevel: 0,
    onKeyboardFocus: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onNestedListToggle: () => {},
    onTouchStart: () => {},
    primaryTogglesNestedList: false,
    secondaryTextLines: 1,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
    isKeyboardFocused: false,
    open: this.props.initiallyOpen,
    rightIconButtonHovered: false,
    rightIconButtonKeyboardFocused: false,
    touch: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  // This method is needed by the `MenuItem` component.
  applyFocusState(focusState) {
    const button = this.refs.enhancedButton;

    if (button) {
      const buttonEl = ReactDOM.findDOMNode(button);

      switch (focusState) {
        case 'none':
          buttonEl.blur();
          break;
        case 'focused':
          buttonEl.focus();
          break;
        case 'keyboard-focused':
          button.setKeyboardFocus();
          buttonEl.focus();
          break;
      }
    }
  }

  createDisabledElement(styles, contentChildren, additionalProps) {
    const {
      innerDivStyle,
      style,
    } = this.props;

    const mergedDivStyles = Object.assign({},
      styles.root,
      styles.innerDiv,
      innerDivStyle,
      style
    );

    return (
      <div
        {...additionalProps}
        style={this.context.muiTheme.prepareStyles(mergedDivStyles)}
      >
        {contentChildren}
      </div>
     );
  }

  createLabelElement(styles, contentChildren, additionalProps) {
    const {
      innerDivStyle,
      style,
    } = this.props;

    const mergedLabelStyles = Object.assign({},
      styles.root,
      styles.innerDiv,
      innerDivStyle,
      styles.label,
      style
    );

    return (
      <label
        {...additionalProps}
        style={this.context.muiTheme.prepareStyles(mergedLabelStyles)}
      >
        {contentChildren}
      </label>
     );
  }

  createTextElement(styles, data, key) {
    const {prepareStyles} = this.context.muiTheme;
    if (React.isValidElement(data)) {
      let style = Object.assign({}, styles, data.props.style);
      if (typeof data.type === 'string') { // if element is a native dom node
        style = prepareStyles(style);
      }
      return React.cloneElement(data, {
        key: key,
        style: style,
      });
    }

    return (
      <div key={key} style={prepareStyles(styles)}>
        {data}
      </div>
    );
  }

  handleKeyboardFocus = (event, isKeyboardFocused) => {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    this.props.onKeyboardFocus(event, isKeyboardFocused);
  };

  handleMouseEnter = (event) => {
    if (!this.state.touch) this.setState({hovered: true});
    this.props.onMouseEnter(event);
  };

  handleMouseLeave = (event) => {
    this.setState({hovered: false});
    this.props.onMouseLeave(event);
  };

  handleNestedListToggle = (event) => {
    event.stopPropagation();
    this.setState({open: !this.state.open});
    this.props.onNestedListToggle(this);
  };

  handleRightIconButtonKeyboardFocus = (event, isKeyboardFocused) => {
    if (isKeyboardFocused) {
      this.setState({
        isKeyboardFocused: false,
        rightIconButtonKeyboardFocused: isKeyboardFocused,
      });
    }

    const iconButton = this.props.rightIconButton;

    if (iconButton && iconButton.props.onKeyboardFocus) iconButton.props.onKeyboardFocus(event, isKeyboardFocused);
  };

  handleRightIconButtonMouseLeave = (event) => {
    const iconButton = this.props.rightIconButton;
    this.setState({rightIconButtonHovered: false});
    if (iconButton && iconButton.props.onMouseLeave) iconButton.props.onMouseLeave(event);
  };

  handleRightIconButtonMouseEnter = (event) => {
    const iconButton = this.props.rightIconButton;
    this.setState({rightIconButtonHovered: true});
    if (iconButton && iconButton.props.onMouseEnter) iconButton.props.onMouseEnter(event);
  };

  handleRightIconButtonMouseUp = (event) => {
    const iconButton = this.props.rightIconButton;
    event.stopPropagation();
    if (iconButton && iconButton.props.onMouseUp) iconButton.props.onMouseUp(event);
  };

  handleRightIconButtonTouchTap = (event) => {
    const iconButton = this.props.rightIconButton;

    // Stop the event from bubbling up to the list-item
    event.stopPropagation();
    if (iconButton && iconButton.props.onTouchTap) iconButton.props.onTouchTap(event);
  };

  handleTouchStart = (event) => {
    this.setState({touch: true});
    this.props.onTouchStart(event);
  };

  pushElement(children, element, baseStyles, additionalProps) {
    if (element) {
      const styles = Object.assign({}, baseStyles, element.props.style);
      children.push(
        React.cloneElement(element, {
          key: children.length,
          style: styles,
          ...additionalProps,
        })
      );
    }
  }

  render() {
    const {
      autoGenerateNestedIndicator,
      children,
      disabled,
      disableKeyboardFocus,
      innerDivStyle,
      insetChildren, // eslint-disable-line no-unused-vars
      leftAvatar,
      leftCheckbox,
      leftIcon,
      nestedItems,
      nestedLevel,
      nestedListStyle,
      onKeyboardFocus, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      onMouseEnter, // eslint-disable-line no-unused-vars
      onTouchStart, // eslint-disable-line no-unused-vars
      onTouchTap,
      rightAvatar,
      rightIcon,
      rightIconButton,
      rightToggle,
      primaryText,
      primaryTogglesNestedList,
      secondaryText,
      secondaryTextLines, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const contentChildren = [children];

    if (leftIcon) {
      this.pushElement(
        contentChildren,
        leftIcon,
        Object.assign({}, styles.icons, styles.leftIcon)
      );
    }

    if (rightIcon) {
      this.pushElement(
        contentChildren,
        rightIcon,
        Object.assign({}, styles.icons, styles.rightIcon)
      );
    }

    if (leftAvatar) {
      this.pushElement(
        contentChildren,
        leftAvatar,
        Object.assign({}, styles.avatars, styles.leftAvatar)
      );
    }

    if (rightAvatar) {
      this.pushElement(
        contentChildren,
        rightAvatar,
        Object.assign({}, styles.avatars, styles.rightAvatar)
      );
    }

    if (leftCheckbox) {
      this.pushElement(
        contentChildren,
        leftCheckbox,
        Object.assign({}, styles.leftCheckbox)
      );
    }

    // RightIconButtonElement
    const hasNestListItems = nestedItems.length;
    const hasRightElement = rightAvatar || rightIcon || rightIconButton || rightToggle;
    const needsNestedIndicator = hasNestListItems && autoGenerateNestedIndicator && !hasRightElement;

    if (rightIconButton || needsNestedIndicator) {
      let rightIconButtonElement = rightIconButton;
      const rightIconButtonHandlers = {
        onKeyboardFocus: this.handleRightIconButtonKeyboardFocus,
        onMouseEnter: this.handleRightIconButtonMouseEnter,
        onMouseLeave: this.handleRightIconButtonMouseLeave,
        onTouchTap: this.handleRightIconButtonTouchTap,
        onMouseDown: this.handleRightIconButtonMouseUp,
        onMouseUp: this.handleRightIconButtonMouseUp,
      };

      // Create a nested list indicator icon if we don't have an icon on the right
      if (needsNestedIndicator) {
        rightIconButtonElement = this.state.open ?
          <IconButton><OpenIcon /></IconButton> :
          <IconButton><CloseIcon /></IconButton>;
        rightIconButtonHandlers.onTouchTap = this.handleNestedListToggle;
      }

      this.pushElement(
        contentChildren,
        rightIconButtonElement,
        Object.assign({}, styles.rightIconButton),
        rightIconButtonHandlers
      );
    }

    if (rightToggle) {
      this.pushElement(
        contentChildren,
        rightToggle,
        Object.assign({}, styles.rightToggle)
      );
    }

    if (primaryText) {
      const primaryTextElement = this.createTextElement(
        styles.primaryText,
        primaryText,
        'primaryText'
      );
      contentChildren.push(primaryTextElement);
    }

    if (secondaryText) {
      const secondaryTextElement = this.createTextElement(
        styles.secondaryText,
        secondaryText,
        'secondaryText'
      );
      contentChildren.push(secondaryTextElement);
    }

    const nestedList = nestedItems.length ? (
      <NestedList nestedLevel={nestedLevel + 1} open={this.state.open} style={nestedListStyle}>
        {nestedItems}
      </NestedList>
    ) : undefined;

    const hasCheckbox = leftCheckbox || rightToggle;

    return (
      <div>
        {
          hasCheckbox ? this.createLabelElement(styles, contentChildren, other) :
          disabled ? this.createDisabledElement(styles, contentChildren, other) : (
            <EnhancedButton
              {...other}
              disabled={disabled}
              disableKeyboardFocus={disableKeyboardFocus || this.state.rightIconButtonKeyboardFocused}
              linkButton={true}
              onKeyboardFocus={this.handleKeyboardFocus}
              onMouseLeave={this.handleMouseLeave}
              onMouseEnter={this.handleMouseEnter}
              onTouchStart={this.handleTouchStart}
              onTouchTap={primaryTogglesNestedList ? this.handleNestedListToggle : onTouchTap}
              ref="enhancedButton"
              style={Object.assign({}, styles.root, style)}
            >
              <div style={prepareStyles(Object.assign(styles.innerDiv, innerDivStyle))}>
                {contentChildren}
              </div>
            </EnhancedButton>
          )
        }
        {nestedList}
      </div>
    );
  }
}

export default ListItem;
