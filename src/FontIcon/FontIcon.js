import React from 'react';
import transitions from '../styles/transitions';

function getStyles(props, context, state) {
  const {
    color,
    hoverColor,
  } = props;

  const {baseTheme} = context.muiTheme;
  const offColor = color || baseTheme.palette.textColor;
  const onColor = hoverColor || offColor;

  return {
    root: {
      color: state.hovered ? onColor : offColor,
      position: 'relative',
      fontSize: baseTheme.spacing.iconSize,
      display: 'inline-block',
      userSelect: 'none',
      transition: transitions.easeOut(),
    },
  };
}

class FontIcon extends React.Component {
  static propTypes = {
    /**
     * This is the font color of the font icon. If not specified,
     * this component will default to muiTheme.palette.textColor.
     */
    color: React.PropTypes.string,

    /**
     * This is the icon color when the mouse hovers over the icon.
     */
    hoverColor: React.PropTypes.string,

    /**
     * Callback function fired when the mouse enters the element.
     *
     * @param {object} event `mouseenter` event targeting the element.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Callback function fired when the mouse leaves the element.
     *
     * @param {object} event `mouseleave` event targeting the element.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  };

  static defaultProps = {
    onMouseEnter: () => {},
    onMouseLeave: () => {},
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
  };

  handleMouseLeave = (event) => {
    // hover is needed only when a hoverColor is defined
    if (this.props.hoverColor !== undefined)
      this.setState({hovered: false});
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  handleMouseEnter = (event) => {
    // hover is needed only when a hoverColor is defined
    if (this.props.hoverColor !== undefined)
      this.setState({hovered: true});
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  render() {
    const {
      onMouseLeave, // eslint-disable-line no-unused-vars
      onMouseEnter, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    return (
      <span
        {...other}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        style={prepareStyles(Object.assign(styles.root, style))}
      />
    );
  }
}

export default FontIcon;
