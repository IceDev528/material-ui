import React from 'react';
import {CircularProgress, LinearProgress, Paper} from 'material-ui';
import ComponentDoc from '../../component-doc';
import Code from 'progress-code';
import CodeExample from '../../CodeExample';
import CodeBlock from '../../CodeExample/CodeBlock';

const ProgressPage = React.createClass({

  getInitialState() {
    return {
      completed: 0,
    };
  },

  componentDidMount() {
    this.timer = setTimeout(() => this._progress(5), 1000);
  },

  componentWillUnmount() {
    clearTimeout(this.timer);
  },

  timer: undefined,

  _progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this._progress(completed + diff), 1000);
    }
  },

  render() {

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'mode',
            type: 'oneOf ["determinate", "indeterminate"]',
            header: 'default: indeterminate',
            desc: 'The mode of show your progress, indeterminate for when there is no value for progress. ',
          },
          {
            name: 'value',
            type: 'number',
            header: 'default: 0',
            desc: 'The value of progress, only works in determinate mode. ',
          },
          {
            name: 'max',
            type: 'number',
            header: 'default: 100',
            desc: 'The max value of progress, only works in determinate mode. ',
          },
          {
            name: 'min',
            type: 'number',
            header: 'default: 0',
            desc: 'The min value of progress, only works in determinate mode. ',
          },
          {
            name: 'size',
            type: 'number',
            header: 'default: 1',
            desc: 'The size of the progress.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the progress\'s root element.',
          },
          {
            name: 'color',
            type: 'string',
            header: 'optional',
            desc: 'Override the progress\'s color.',
          },
        ],
      },
    ];


    return (
      <ComponentDoc
        name="Progress"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\import CircularProgress from \'material-ui/lib/circular-progress\';\n' +
            'import LinearProgress from \'material-ui/lib/linear-progress\';\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <h2>Linear Progress</h2>
          <p>
            Determinate
          </p>
          <LinearProgress mode="determinate" value={this.state.completed} />
          <p>
            Indeterminate
          </p>
          <LinearProgress mode="indeterminate" />
          <p>
            Overriding the theme's color
          </p>
          <LinearProgress mode="determinate" color={"#4CAF50"} value={this.state.completed} />
          <br/><br/>
          <h2>Circular Progress</h2>
          <p>
            Determinate
          </p>
          <CircularProgress mode="determinate" value={this.state.completed} />
          <CircularProgress mode="determinate" value={this.state.completed} size={1.5} />
          <CircularProgress mode="determinate" value={this.state.completed} size={2} />
          <p>
            Indeterminate
          </p>
          <CircularProgress mode="indeterminate" />
          <CircularProgress mode="indeterminate" size={1.5} />
          <CircularProgress mode="indeterminate" color={"red"} size={2} />
        </CodeExample>
      </ComponentDoc>
    );
  },

});

export default ProgressPage;
