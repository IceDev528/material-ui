import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Popover from '../Popover/Popover';
import CheckIcon from '../svg-icons/navigation/check';
import ListItem from '../List/ListItem';
import getMuiTheme from '../styles/getMuiTheme';
import Menu from '../Menu/Menu';

const nestedMenuStyle = {
  position: 'relative',
};

const MenuItem = React.createClass({

  propTypes: {
    /**
     * If true, a left check mark will be rendered.
     */
    checked: React.PropTypes.bool,

    /**
     * Elements passed as children to the underlying `ListItem`.
     */
    children: React.PropTypes.node,

    /**
     * @ignore
     * If true, the menu item will render with compact desktop
     * styles.
     */
    desktop: React.PropTypes.bool,

    /**
     * If true, the menu item will be disabled.
     */
    disabled: React.PropTypes.bool,

    /**
     * The focus state of the menu item. This prop is used to set the focus
     * state of the underlying `ListItem`.
     */
    focusState: React.PropTypes.oneOf([
      'none',
      'focused',
      'keyboard-focused',
    ]),

    /**
     * Override the inline-styles of the inner div.
     */
    innerDivStyle: React.PropTypes.object,

    /**
     * If true, the children will be indented.
     * This is only needed when there is no `leftIcon`.
     */
    insetChildren: React.PropTypes.bool,

    /**
     * The `SvgIcon` or `FontIcon` to be displayed on the left side.
     */
    leftIcon: React.PropTypes.element,

    /**
     * `MenuItem` elements to nest within the menu item.
     */
    menuItems: React.PropTypes.node,

    /**
     * Callback function fired when the menu item is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the menu item.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * Can be used to render primary text within the menu item.
     */
    primaryText: React.PropTypes.node,

    /**
     * The `SvgIcon` or `FontIcon` to be displayed on the right side.
     */
    rightIcon: React.PropTypes.element,

    /**
     * Can be used to render secondary text within the menu item.
     */
    secondaryText: React.PropTypes.node,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The value of the menu item.
     */
    value: React.PropTypes.any,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
  ],

  getDefaultProps() {
    return {
      checked: false,
      desktop: false,
      disabled: false,
      focusState: 'none',
      insetChildren: false,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
      open: false,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._applyFocusState();
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });

    if (this.state.open && nextProps.focusState === 'none') {
      this._onRequestClose();
    }
  },

  componentDidUpdate() {
    this._applyFocusState();
  },

  componentWillUnmount() {
    if (this.state.open) {
      this.setState({
        open: false,
      });
    }
  },

  _applyFocusState() {
    this.refs.listItem.applyFocusState(this.props.focusState);
  },

  _cloneMenuItem(item) {
    return React.cloneElement(item, {
      onTouchTap: (event) => {
        if (!item.props.menuItems) {
          this._onRequestClose();
        }

        if (item.props.onTouchTap) {
          item.props.onTouchTap(event);
        }
      },
      onRequestClose: this._onRequestClose,
    });
  },

  _onTouchTap(event) {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: ReactDOM.findDOMNode(this),
    });

    if (this.props.onTouchTap) {
      this.props.onTouchTap(event);
    }
  },

  _onRequestClose() {
    this.setState({
      open: false,
      anchorEl: null,
    });
  },

  render() {
    const {
      checked,
      children,
      desktop,
      disabled,
      focusState,
      innerDivStyle,
      insetChildren,
      leftIcon,
      menuItems,
      rightIcon,
      secondaryText,
      style,
      value,
      ...other,
    } = this.props;

    const {
      prepareStyles,
      menuItem,
    } = this.state.muiTheme;

    const disabledColor = this.state.muiTheme.rawTheme.palette.disabledColor;
    const textColor = this.state.muiTheme.rawTheme.palette.textColor;
    const leftIndent = desktop ? 64 : 72;
    const sidePadding = desktop ? 24 : 16;

    const styles = {
      root: {
        color: disabled ? disabledColor : textColor,
        lineHeight: desktop ? '32px' : '48px',
        fontSize: desktop ? 15 : 16,
        whiteSpace: 'nowrap',
      },

      innerDivStyle: {
        paddingLeft: leftIcon || insetChildren || checked ? leftIndent : sidePadding,
        paddingRight: sidePadding,
        paddingBottom: 0,
        paddingTop: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'space-between',
      },

      secondaryText: {
        order: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },

      leftIconDesktop: {
        margin: 0,
        left: 24,
        top: 4,
      },

      rightIconDesktop: {
        margin: 0,
        right: 24,
        top: 4,
        fill: menuItem.rightIconDesktopFill,
      },
    };

    const mergedRootStyles = Object.assign(styles.root, style);
    const mergedInnerDivStyles = Object.assign(styles.innerDivStyle, innerDivStyle);

    //Left Icon
    let leftIconElement = leftIcon ? leftIcon : checked ? <CheckIcon /> : null;
    if (leftIconElement && desktop) {
      const mergedLeftIconStyles = Object.assign(styles.leftIconDesktop, leftIconElement.props.style);
      leftIconElement = React.cloneElement(leftIconElement, {style: mergedLeftIconStyles});
    }

    //Right Icon
    let rightIconElement;
    if (rightIcon) {
      const mergedRightIconStyles = desktop ?
        Object.assign(styles.rightIconDesktop, rightIcon.props.style) : rightIcon.props.style;
      rightIconElement = React.cloneElement(rightIcon, {style: mergedRightIconStyles});
    }

    //Secondary Text
    let secondaryTextElement;
    if (secondaryText) {
      const secondaryTextIsAnElement = React.isValidElement(secondaryText);
      const mergedSecondaryTextStyles = secondaryTextIsAnElement ?
      Object.assign(styles.secondaryText, secondaryText.props.style) : null;

      secondaryTextElement = secondaryTextIsAnElement ?
        React.cloneElement(secondaryText, {style: mergedSecondaryTextStyles}) :
        <div style={prepareStyles(styles.secondaryText)}>{secondaryText}</div>;
    }
    let childMenuPopover;
    if (menuItems) {
      childMenuPopover = (
        <Popover
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          useLayerForClickAway={false}
          onRequestClose={this._onRequestClose}
        >
          <Menu desktop={desktop} disabled={disabled} style={nestedMenuStyle}>
            {React.Children.map(menuItems, this._cloneMenuItem)}
          </Menu>
        </Popover>
      );
      other.onTouchTap = this._onTouchTap;
    }

    return (
      <ListItem
        {...other}
        disabled={disabled}
        innerDivStyle={mergedInnerDivStyles}
        insetChildren={insetChildren}
        leftIcon={leftIconElement}
        ref="listItem"
        rightIcon={rightIconElement}
        style={mergedRootStyles}
      >
        {children}
        {secondaryTextElement}
        {childMenuPopover}
      </ListItem>
    );
  },

});

export default MenuItem;
