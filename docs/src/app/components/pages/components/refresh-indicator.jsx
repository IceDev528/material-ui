import React from 'react';
import {RefreshIndicator, Paper} from 'material-ui';
import ComponentDoc from '../../component-doc';
import Code from 'refresh-indicator-code';
import CodeExample from '../../CodeExample';
import CodeBlock from '../../CodeExample/CodeBlock';

let RefreshIndicatorPage = React.createClass({

  render() {

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'percentage',
            type: 'number',
            header: 'default: 0',
            desc: 'The confirmation progress to fetch data. Max value is 100',
          },
          {
            name: 'size',
            type: 'number',
            header: 'default: 40',
            desc: 'Size in pixels.',
          },
          {
            name: 'status',
            type: 'oneOf ["ready", "loading", "hide"]',
            header: 'default: hide',
            desc: `The display status of the indicator.
              If the status is "ready", the indicator will display the ready state arrow.
              If the status is "loading", it will display the loading progress indicator.
              If the status is "hide", the indicator will be hidden.`,
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the indicator\'s root element.',
          },
          {
            name: 'color',
            type: 'string',
            header: 'optional',
            desc: `Override the theme's color of the indicator while it's
              status is "ready" or it's percentage is less than 100.`,
          },
          {
            name: 'loadingColor',
            type: 'string',
            header: 'optional',
            desc: `Override the theme's color of the indicator
              while it's status is "loading" or it's percentage is 100.`,
          },
          {
            name: 'top',
            type: 'number',
            header: 'required',
            desc: 'The absolute right position of the indicator in pixels.',
          },
          {
            name: 'left',
            type: 'number',
            header: 'required',
            desc: 'The absolute left position of the indicator in pixels.',
          },
        ],
      },
    ];


    return (
      <ComponentDoc
        name="RefreshIndicator"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nimport RefreshIndicator from \'material-ui/lib/refresh-indicator\';\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <div style={{position: 'relative'}}>
            <p>
              Ready status
            </p>
            <RefreshIndicator
              percentage={30}
              size={40}
              left={10}
              top={30}
              status="ready" />
            <RefreshIndicator
              percentage={60}
              size={40}
              left={65}
              top={30}
              status="ready" />
            <RefreshIndicator
              percentage={80}
              size={40}
              left={120}
              top={30}
              color={"red"}
              status="ready" />
            <RefreshIndicator
              percentage={100}
              size={40}
              left={175}
              top={30}
              status="ready" />
            <p style={{marginTop: 80, marginBottom: 80}}>
              Loading status
            </p>
            <RefreshIndicator size={40} left={10} top={130} status="loading" />
            <RefreshIndicator size={40} left={70} top={130} loadingColor={"#FF9800"}
              status="loading" />
          </div>
        </CodeExample>
      </ComponentDoc>
    );
  },

});

export default RefreshIndicatorPage;
