import React from 'react';
import {FontIcon, Styles, Paper} from 'material-ui';
import CodeBlock from '../../code-example/code-block';
import ComponentDoc from '../../component-doc';
import ActionHome from 'material-ui/svg-icons/action/home';

const {Colors, Typography} = Styles;
import IconButtonCode from 'icons-code';
import SvgIconsCode from 'svg-icons-code';
import CodeExample from '../../code-example/code-example';

export default class FontIconPage extends React.Component {

  getStyles() {
    return {
      //mui-font-style-subhead-2
      fontSize: '15px',
      letterSpacing: '0',
      fontWeight: Typography.fontWeightNormal,
      color: Typography.textDarkBlack,
      lineHeight: '24px',
      paddingTop: '3px',
      marginBottom: '13px',
    };
  }

  render() {

    const fontIconDesc = (
      <div>
        <p style={this.getStyles()}>
          This component will render any icon defined in any style sheets included in your
          project. We are using <a title="Google's Material Design Icons GitHub"
            href="https://github.com/google/material-design-icons">Google&#39;s Material Design
          Icons</a> for our documentation site along with some custom icons. You can use
          sites like <a title="Icomoon website" href="https://icomoon.io/">IcoMoon</a> for
          generating custom font files. To use FontIcons, add your stylesheet to your project
          and reference the icon&#39;s className in the "className" prop. <br /><br />
          We also support <a title="Google's
          Material Icons" href="https://google.github.io/material-design-icons">Google&#39;s
          Material Icons</a> as seen in the third block of code.
          If you&#39;re using the material icons,
          be sure to include the link to the font icon file in your head section:
        </p>
        <Paper>
          <CodeBlock>
            {'<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'}
          </CodeBlock>
        </Paper>
        <p style={this.getStyles()}>
          To see available Material Icons, go to <a href="https://www.google.com/design/icons/">
          material icons library</a>. The names are in snake_case format, for example: <i>find_in_page</i>
        </p>
      </div>
    );

    let svgIconDesc = (
      <div>
        <p style={this.getStyles()}>
          Alternatively, it is possible to include svg icons using mui.SvgIcon to
          create a custom svg component. Here we are creating the ActionHome
          SvgIcon for this docs site, and using it in some seperate component.
          Custom SvgIcon components can be included as children for other Material
          UI components that use icons such as <a title="Example of SvgIcon usage"
            href="#/components/icon-buttons">IconButtons</a>.
        </p>
        <p>
          For all of the Google's Material Design Icons prebuild SvgIcon components
          exist. They can be used this way:
        </p>
          <CodeBlock>
            {`
import SocialNotificationsActive from 'material-ui/lib/svg-icons/social/notifications-active';
...
  render: function() {
    return (
      <SocialNotificationsActive />
    );
  }
`}
          </CodeBlock>
      </div>
    );

    let componentInfo = [
      {
        name: 'Properties',
        infoArray: [
          {
            name: 'color',
            type: 'string',
            header: 'optional',
            desc: 'This is the font color of the font icon. If not specified, ' +
              'this component will default to muiTheme.palette.textColor.',
          },
          {
            name: 'hoverColor',
            type: 'string',
            header: 'optional',
            desc: 'This is the icon color when the mouse hovers over the icon.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the font icon\'s root element.',
          },
        ],
      },
      {
        name: 'Properties',
        infoArray: [
          {
            name: 'color',
            type: 'string',
            header: 'optional',
            desc: 'This is the fill color of the svg icon. If not specified, ' +
              'this component will default to muiTheme.palette.textColor.',
          },
          {
            name: 'hoverColor',
            type: 'string',
            header: 'optional',
            desc: 'This is the icon color when the mouse hovers over the icon.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the svg icon\'s root element.',
          },
        ],
      },
    ];

    let iconStyles = {
      marginRight: 24,
    };

    return (
      <div>
        <ComponentDoc
          name="Font Icons"
          desc={fontIconDesc}
          componentInfo={componentInfo.slice(0, 1)}>

          <Paper style = {{marginBottom: '22px'}}>
            <CodeBlock>
            {
              '//Import statement:\nimport FontIcon from \'material-ui/lib/font-icon\';\n\n' +
              '//See material-ui/lib/index.js for more\n'
            }
            </CodeBlock>
          </Paper>

          <CodeExample code={IconButtonCode}>
            <FontIcon className="muidocs-icon-action-home" style={iconStyles} />
            <FontIcon className="muidocs-icon-action-home" style={iconStyles} color={Colors.red500} />
            <FontIcon className="muidocs-icon-action-home" style={iconStyles} color={Colors.yellow500} />
            <FontIcon className="muidocs-icon-action-home" style={iconStyles} color={Colors.blue500} />
            <br/><br/>
            <FontIcon className="muidocs-icon-action-home" style={iconStyles}
              hoverColor={Colors.greenA200} />
            <FontIcon className="muidocs-icon-action-home" style={iconStyles}
              color={Colors.red500} hoverColor={Colors.greenA200} />
            <FontIcon className="muidocs-icon-action-home" style={iconStyles}
              color={Colors.yellow500} hoverColor={Colors.greenA200} />
            <FontIcon className="muidocs-icon-action-home" style={iconStyles}
              color={Colors.blue500} hoverColor={Colors.greenA200} />
            <br/><br/>
            <FontIcon className="material-icons" style={iconStyles} >home</FontIcon>
            <FontIcon className="material-icons" style={iconStyles} color={Colors.red500}>flight_takeoff</FontIcon>
            <FontIcon className="material-icons" style={iconStyles} color={Colors.yellow500}>cloud_download</FontIcon>
            <FontIcon className="material-icons" style={iconStyles} color={Colors.blue500}>videogame_asset</FontIcon>
          </CodeExample>
        </ComponentDoc>
        <ComponentDoc
          name="SVG Icons"
          desc={svgIconDesc}
          componentInfo={componentInfo.slice(1, 2)}>
          <CodeExample code={SvgIconsCode}>
            <ActionHome style={iconStyles} />
            <ActionHome style={iconStyles} color={Colors.red500} />
            <ActionHome style={iconStyles} color={Colors.yellow500} />
            <ActionHome style={iconStyles} color={Colors.blue500} />
            <br/><br/>
            <ActionHome style={iconStyles} hoverColor={Colors.greenA200} />
            <ActionHome style={iconStyles} color={Colors.red500} hoverColor={Colors.greenA200} />
            <ActionHome style={iconStyles} color={Colors.yellow500} hoverColor={Colors.greenA200} />
            <ActionHome style={iconStyles} color={Colors.blue500} hoverColor={Colors.greenA200} />
          </CodeExample>
        </ComponentDoc>
      </div>
    );
  }

}
