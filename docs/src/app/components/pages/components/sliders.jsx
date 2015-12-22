import React from 'react';
import {Paper, Slider} from 'material-ui';
import ComponentDoc from '../../component-doc';
import Code from 'sliders-code';
import CodeExample from '../../CodeExample';
import CodeBlock from '../../CodeExample/CodeBlock';

export default class SlidersPage extends React.Component {

  handleMouseDown(e) {
    console.log('hmd', e);
  }

  render() {

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'name',
            type: 'string',
            header: 'required',
            desc: 'The name of the slider. Behaves like the name attribute of an input element.',
          },
          {
            name: 'defaultValue',
            type: 'number',
            header: 'default: 0',
            desc: 'The default value of the slider.',
          },
          {
            name: 'description',
            type: 'string',
            header: 'optional',
            desc: 'Describe the slider.',
          },
          {
            name: 'disabled',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the slider will not be interactable.',
          },
          {
            name: 'error',
            type: 'string',
            header: 'optional',
            desc: 'An error message for the slider.',
          },
          {
            name: 'max',
            type: 'number',
            header: 'default: 1',
            desc: 'The maximum value the slider can slide to on a scale from ' +
                  '0 to 1 inclusive. Cannot be equal to min.',
          },
          {
            name: 'min',
            type: 'number',
            header: 'default: 0',
            desc: 'The minimum value the slider can slide to on a scale from ' +
                  '0 to 1 inclusive. Cannot be equal to max.',
          },
          {
            name: 'required',
            type: 'bool',
            header: 'default: true',
            desc: 'Whether or not the slider is required in a form.',
          },
          {
            name: 'step',
            type: 'number',
            header: 'default: 0.01',
            desc: 'The granularity the slider can step through values.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the Slider\'s root element.',
          },
          {
            name: 'value',
            type: 'number',
            header: 'optional',
            desc: 'The value of the slider.',
          },
        ],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onBlur',
            type: 'function(event)',
            header: 'optional',
            desc: 'Callback function that is fired when the focus has left the slider.',
          },
          {
            name: 'onChange',
            type: 'function(event, value)',
            header: 'optional',
            desc: 'Callback function that is fired when the user changes the ' +
                  'slider\'s value.',
          },
          {
            name: 'onDragStart',
            type: 'function(event)',
            header: 'optional',
            desc: 'Callback function that is fired when the slider has begun to move.',
          },
          {
            name: 'onDragStop',
            type: 'function(event)',
            header: 'optional',
            desc: 'Callback function that is fried when teh slide has stopped moving.',
          },
          {
            name: 'onFocus',
            type: 'function(event)',
            header: 'optional',
            desc: 'Callback fired when the user has focused on the slider.',
          },
        ],
      },
    ];

    return (
      <ComponentDoc
        name="Sliders"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nimport Slider from \'material-ui/lib/slider\';\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <Slider name="slider1" />
          <Slider name="slider2" defaultValue={0.5} step={0.10} />
          <Slider name="slider3" defaultValue={1}/>
          <Slider name="slider1" disabled={true} />
          <Slider name="slider2" disabled={true} value={0.5} />
          <Slider name="slider3" disabled={true} value={1} />
        </CodeExample>
      </ComponentDoc>
    );
  }

}
