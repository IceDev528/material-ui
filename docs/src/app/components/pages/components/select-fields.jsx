import React from 'react';
import {ClearFix, Mixins, SelectField, Paper} from 'material-ui';
import ComponentDoc from '../../component-doc';
const {StyleResizable} = Mixins;
import Code from 'select-fields-code';
import CodeExample from '../../code-example/code-example';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import CodeBlock from '../../code-example/code-block';

const SelectFieldsPage = React.createClass({

  mixins: [StyleResizable, LinkedStateMixin],

  getInitialState() {
    return {
      selectValue: undefined,
      selectValue2: 1,
      selectValue3: '1',
      selectValueLinkValue: 4,
      selectValueLinkValue2: 3,
    };
  },

  getStyles() {
    let styles = {
      textfield: {
        marginBottom: 24,
      },
    };

    return styles;
  },

  render() {
    let desc = `This component extends the current input element and will support all of its props and events.
      It supports valueLink and can be controlled or uncontrolled.`;

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'disabled',
            type: 'bool',
            header: 'optional',
            desc: 'Disables the select field if set to true.',
          },
          {
            name: 'displayMember',
            type: 'string',
            header: 'default: text',
            desc: 'SelectField will use text as default value, with this ' +
              'property you can choose another name.',
          },
          {
            name: 'labelMember',
            type: 'string',
            header: 'default: text',
            desc: 'DropDownMenu will use text as default value, with this ' +
            'property you can choose another name.',
          },
          {
            name: 'errorStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override error styles.',
          },
          {
            name: 'errorText',
            type: 'node',
            header: 'optional',
            desc: 'The error content to display.',
          },
          {
            name: 'floatingLabelStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override floating label styles.',
          },
          {
            name: 'floatingLabelText',
            type: 'node',
            header: 'optional',
            desc: 'The content to use for the floating label element.',
          },
          {
            name: 'fullWidth',
            type: 'bool',
            header: 'optional',
            desc: 'If true, the field receives the property width 100%.',
          },
          {
            name: 'hintText',
            type: 'node',
            header: 'optional',
            desc: 'The hint content to display.',
          },
          {
            name: 'iconStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of SelectField\'s icon element.',
          },
          {
            name: 'labelStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of SelectField\'s label when the SelectField is inactive.',
          },
          {
            name: 'valueMember',
            type: 'string',
            header: 'default: payload',
            desc: 'SelectField will use payload as default value, with this ' +
                'property you can choose another name.',
          },
          {
            name: 'menuItemStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the inline-styles of the MenuItems when the ' +
                  'SelectField is expanded.',
          },
          {
            name: 'selectedIndex',
            type: 'number',
            header: 'default: 0',
            desc: 'Index of the item selected.',
          },
          {
            name: 'selectFieldRoot',
            type: 'object',
            header: 'optional',
            desc: 'The style object to use to override the drop-down menu',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the SelectField\'s root element.',
          },
          {
            name: 'underlineDisabledStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the SelectField\'s underline element when disabled.',
          },
          {
            name: 'underlineFocusStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the SelectField\'s underline element when focussed.',
          },
          {
            name: 'underlineStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of SelectField\'s underline.',
          },
        ],
      },
      {
        name: 'Methods',
        infoArray: [],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onBlur',
            header: 'function(event)',
            desc: 'Callback function that is fired when the selectfield loses' +
                  'focus.',
          },
          {
            name: 'onChange',
            header: 'function(event, selectedIndex)',
            desc: 'Callback function that is fired when the selectfield\'s value ' +
                  'changes.',
          },
          {
            name: 'onFocus',
            header: 'function(event)',
            desc: 'Callback function that is fired when the selectfield gains ' +
                  'focus.',
          },
        ],
      },
    ];

    let menuItems = [
      {payload: '1', text: 'Never'},
      {payload: '2', text: 'Every Night'},
      {payload: '3', text: 'Weeknights'},
      {payload: '4', text: 'Weekends'},
      {payload: '5', text: 'Weekly'},
    ];
    let arbitraryArrayMenuItems = [
      {id: 1, name: 'Never'},
      {id: 2, name: 'Every Night'},
      {id: 3, name: 'Weeknights'},
      {id: 4, name: 'Weekends'},
      {id: 5, name: 'Weekly'},
    ];
    let menuItemsWithLabel = [
      {payload: '1', text: 'Morning', period: '5 am - 12 pm'},
      {payload: '2', text: 'Afternoon', period: '12 pm - 5 pm'},
      {payload: '3', text: 'Evening', period: '5 pm to 9 pm'},
      {payload: '4', text: 'Night', period: '9 pm to 4 am'},
    ];

    let styles = this.getStyles();

    return (
      <ComponentDoc
        name="Select Field"
        desc={desc}
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\n' +
            'import SelectField from \'material-ui/lib/select-field\';\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <ClearFix>
            <SelectField
              style={styles.textfield}
              value={this.state.selectValue}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue')}
              hintText="Hint Text"
              menuItems={menuItems} /><br/>
            <SelectField
              menuItems={menuItemsWithLabel}
              labelMember="period" /><br/>
            <SelectField
              valueLink={this.linkState('selectValueLinkValue')}
              floatingLabelText="Float Label Text"
              valueMember="id"
              displayMember="name"
              menuItems={arbitraryArrayMenuItems} /><br/>
            <SelectField
              valueLink={this.linkState('selectValueLinkValue2')}
              floatingLabelText="Float Custom Label Text"
              floatingLabelStyle={{color: 'red'}}
              valueMember="id"
              displayMember="name"
              menuItems={arbitraryArrayMenuItems} /><br/>
            <SelectField
              floatingLabelText="With default value"
              value={this.state.selectValue2}
              valueMember="id"
              displayMember="name"
              onChange={this._handleSelectValueChange.bind(null, 'selectValue2')}
              menuItems={arbitraryArrayMenuItems} /><br/>
            <SelectField
              floatingLabelText="Disabled"
              disabled={true}
              value={'4'}
              menuItems={menuItems} /><br/>
            <SelectField
              value={this.state.selectValue}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue')}
              menuItems={menuItems} /><br/>
            <SelectField
              floatingLabelText="With default value"
              value={this.state.selectValue3}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue3')}
              menuItems={menuItems}
              errorText="This is always wrong" /><br/>
            <SelectField
              value={this.state.selectValue3}
              onChange={this._handleSelectValueChange.bind(null, 'selectValue3')}
              menuItems={menuItems}
              errorText="This is always wrong" /><br/>
          </ClearFix>
        </CodeExample>
      </ComponentDoc>
    );
  },

  _handleSelectValueChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  },
});

export default SelectFieldsPage;
