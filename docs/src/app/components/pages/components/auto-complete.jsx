import React from 'react';

import {AutoComplete} from 'material-ui';
import ComponentDoc from '../../component-doc';
import CodeExample from '../../code-example/code-example';

import Code from 'auto-complete-code';

class AutoCompletePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input1: [],
      input2: [],
      input3: [],
    };
  }

  render() {

    return (
      <ComponentDoc
        name="Auto Complete"
        componentInfo={[
          {
            name: 'Auto Complete',
            infoArray: [],
          },
        ]}>

        <br/>

        <CodeExample code={Code}>
          <AutoComplete
            dataSource={this.state.input1}
            onUpdateInput={(t) => { console.log(t); this.setState({input1: [t, t + t, t + t + t]}); }}
            onNewRequest={(t) => { console.log('request:' + t); }} />

          <AutoComplete
            fullWidth={true}
            hintText="hint"
            dataSource={this.state.input2}
            onUpdateInput={(t) => { console.log(t); this.setState({input2: [t, t + t, t + t + t]}); }}
            onNewRequest={(t) => { console.log('request:' + t); }} />

          <AutoComplete
            fullWidth={true}
            searchText="***************"
            errorText="error message"
            dataSource={this.state.input3}
            onUpdateInput={(t) => { console.log(t); this.setState({input3: [t, t + t, t + t + t]}); }}
            onNewRequest={(t) => { console.log('request:' + t); }} />

          <AutoComplete
            fullWidth={true}
            hintText="text-value data"
            onUpdateInput={(t) => {
              console.log(t);
            }}
            showAllItems={true}
            dataSource={[
              {
                text: 'text-value1',
                value: (<AutoComplete.Item primaryText={'text-value1'} secondaryText="&#9786;" />),
              },
              {
                text: 'text-value2',
                value: (<AutoComplete.Item primaryText={'text-value2'} secondaryText="&#9786;" />),
              },
            ]}
            onNewRequest={(t, index) => { console.log('request:' + index); }} />

          <AutoComplete
            floatingLabelText="floating Label"
            dataSource={['12345', '23456', '34567']} />

          <AutoComplete
            fullWidth={true}
            floatingLabelText="showAllItems"
            showAllItems={true}
            animated={false}
            dataSource={['12345', '23456', '34567']} />

        </CodeExample>

      </ComponentDoc>
    );

  }


}

export default AutoCompletePage;
