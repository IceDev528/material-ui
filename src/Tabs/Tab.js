import React from 'react';
import EnhancedButton from '../internal/EnhancedButton';

function getStyles(props, context) {
  const {tabs} = context.muiTheme;

  return {
    root: {
      color: props.selected ? tabs.selectedTextColor : tabs.textColor,
      fontWeight: 500,
      fontSize: 14,
      width: props.width,
      textTransform: 'uppercase',
      padding: 0,
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: (props.label && props.icon) ? 53 : 24,
      padding: 12,
      paddingBottom: (props.label && props.icon) ? 7 : 12,
    },
  };
}

class Tab extends React.Component {
  static muiName = 'Tab';

  static propTypes = {
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Sets the icon of the tab, you can pass `FontIcon` or `SvgIcon` elements.
     */
    icon: React.PropTypes.node,

    /**
     * Sets the text value of the tab item to the string specified.
     */
    label: React.PropTypes.node,

    /**
     * Fired when the active tab changes by touch or tap.
     * Use this event to specify any functionality when an active tab changes.
     * For example - we are using this to route to home when the third tab becomes active.
     * This function will always recieve the active tab as it\'s first argument.
     */
    onActive: React.PropTypes.func,

    /**
     * @ignore
     * This property is overriden by the Tabs component.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * @ignore
     * Defines if the current tab is selected or not.
     * The Tabs component is responsible for setting this property.
     */
    selected: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * If value prop passed to Tabs component, this value prop is also required.
     * It assigns a value to the tab so that it can be selected by the Tabs.
     */
    value: React.PropTypes.any,

    /**
     * @ignore
     * This property is overriden by the Tabs component.
     */
    width: React.PropTypes.string,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  handleTouchTap = (event) => {
    if (this.props.onTouchTap) {
      this.props.onTouchTap(this.props.value, event, this);
    }
  };

  render() {
    const {
      label,
      onActive, // eslint-disable-line no-unused-vars
      onTouchTap, // eslint-disable-line no-unused-vars
      selected, // eslint-disable-line no-unused-vars
      style,
      value, // eslint-disable-line no-unused-vars
      width, // eslint-disable-line no-unused-vars
      icon,
      ...other,
    } = this.props;

    const styles = getStyles(this.props, this.context);

    let iconElement;
    if (icon && React.isValidElement(icon)) {
      const params = {
        style: {
          fontSize: 24,
          color: styles.root.color,
        },
      };
      // If it's svg icon set color via props
      if (icon.type.muiName !== 'FontIcon') {
        params.color = styles.root.color;
      }
      iconElement = React.cloneElement(icon, params);
    }

    const rippleOpacity = 0.3;
    const rippleColor = this.context.muiTheme.tabs.selectedTextColor;

    return (
      <EnhancedButton
        {...other}
        style={Object.assign(styles.root, style)}
        focusRippleColor={rippleColor}
        touchRippleColor={rippleColor}
        focusRippleOpacity={rippleOpacity}
        touchRippleOpacity={rippleOpacity}
        onTouchTap={this.handleTouchTap}
      >
        <div style={styles.button} >
          {iconElement}
          {label}
        </div>
      </EnhancedButton>
    );
  }
}

export default Tab;
