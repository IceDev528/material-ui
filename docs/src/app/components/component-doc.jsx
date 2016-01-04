import React from 'react';
import {ClearFix, Mixins, Styles} from 'material-ui';
import ComponentInfo from './component-info';
const Typography = Styles.Typography;
const {StylePropable} = Mixins;
const ThemeManager = Styles.ThemeManager;
const DefaultRawTheme = Styles.LightRawTheme;

const ComponentDoc = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    componentInfo: React.PropTypes.array.isRequired,
    desc: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    name: React.PropTypes.string.isRequired,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles() {
    let borderColor = this.state.muiTheme.rawTheme.palette.borderColor;
    return {
      desc: {
        borderBottom: 'solid 1px ' + borderColor,
        paddingTop: '8px',
        paddingBottom: '40px',
        marginBottom: '24px',
        //mui-font-style-subhead-1
        fontSize: '15px',
        letterSpacing: '0',
        lineHeight: '24px',
        color: Typography.textDarkBlack,
      },
      ol: {
        fontSize: '13px',
        paddingLeft: '48px',
      },
      componentInfo: {
        borderTop: 'solid 1px ' + borderColor,
        paddingTop: '24px',
        marginTop: '24px',
      },
      componentInfoWhenFirstChild: {
        borderTop: 'none',
        marginTop: '0',
        paddingTop: '0',
      },
      headline: {
        //headline
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack,
      },
    };
  },

  render() {
    let styles = this.getStyles();

    let componentInfo = this.props.componentInfo.map(function(info, i) {
      let infoStyle = styles.componentInfo;
      if (i === 0) infoStyle = this.mergeStyles(infoStyle, styles.componentInfoWhenFirstChild);
      return (
        <ComponentInfo
          key={i}
          name={info.name}
          style={infoStyle}
          infoArray={info.infoArray} />
      );
    }, this);

    let desc = null;

    if (this.props.desc) {
      if ((typeof this.props.desc) === 'string') {
        desc = <p style={this.prepareStyles(styles.desc)}>{this.props.desc}</p>;
      } else {
        desc = <div style={this.prepareStyles(styles.desc)}>{this.props.desc}</div>;
      }
    }

    let header;
    if (this.props.name.length > 0) {
      header = <h2 style={this.prepareStyles(styles.headline)}>{this.props.name}</h2>;
    }

    return (
      <ClearFix>
        {header}
        {this.props.children}

        {desc}

        <div>
          {componentInfo}
        </div>

      </ClearFix>
    );
  },

});

export default ComponentDoc;
