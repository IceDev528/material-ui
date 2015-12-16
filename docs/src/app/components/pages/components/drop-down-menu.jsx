import React from 'react';
import {DropDownMenu, Paper} from 'material-ui';
import ComponentDoc from '../../component-doc';
import Code from 'drop-down-menu-code';
import CodeExample from '../../code-example/code-example';
import CodeBlock from '../../code-example/code-block';

export default class DropDownMenuPage extends React.Component {

  render() {

    let menuItems = [
      {payload: '1', text: 'Never'},
      {payload: '2', text: 'Every Night'},
      {payload: '3', text: 'Weeknights'},
      {payload: '4', text: 'Weekends'},
      {payload: '5', text: 'Weekly'},
    ];

    let longMenuItems = [];
    for (let i = 0; i < 100; i++ ) {
      longMenuItems.push({
        payload: i.toString(),
        text: 'Item ' + i,
      });
    }

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'displayMember',
            type: 'string',
            header: 'default: text',
            desc: 'DropDownMenu will use text as default value, with this ' +
              'property you can choose another name.',
          },
          {
            name: 'valueMember',
            type: 'string',
            header: 'default: payload',
            desc: 'DropDownMenu will use payload as default value, with this ' +
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
            name: 'autoWidth',
            type: 'bool',
            header: 'default: true',
            desc: 'The width will automatically be set according to the items ' +
              'inside the menu. To control this width in Css instead, set this ' +
              'prop to false.',
          },
          {
            name: 'menuItems',
            type: 'array',
            header: 'required',
            desc: 'JSON data representing all menu items in the dropdown.',
          },
          {
            name: 'menuItemStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the inline-styles of the MenuItems when the ' +
                  'DropDownMenu is expanded.',
          },
          {
            name: 'menuStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the inline-styles of the Menu when the ' +
                  'DropDownMenu is expanded.',
          },
          {
            name: 'selectedIndex',
            type: 'number',
            header: 'default: 0',
            desc: 'Index of the item selected.',
          },
          {
            name: 'underlineStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of DropDownMenu\'s underline.',
          },
          {
            name: 'iconStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of DropDownMenu\'s icon element.',
          },
          {
            name: 'labelStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the styles of DropDownMenu\'s label when the DropDownMenu is inactive.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the inline-styles of DropDownMenu\'s root element.',
          },
          {
            name: 'disabled',
            type: 'bool',
            header: 'default: false',
            desc: 'Disables the menu.',
          },
          {
            name: 'openImmediately',
            type: 'bool',
            header: 'default: false',
            desc: 'Set to true to have the DropDownMenu automatically open on mount.',
          },
        ],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onChange',
            header: 'function(event, selectedIndex, menuItem)',
            desc: 'Fired when a menu item is clicked that is not the one currently ' +
              'selected.',
          },
        ],
      },
    ];

    let menuItemsWithLabel = [
      {payload: '1', text: 'Morning', period: '5 am - 12 pm'},
      {payload: '2', text: 'Afternoon', period: '12 pm - 5 pm'},
      {payload: '3', text: 'Evening', period: '5 pm to 9 pm'},
      {payload: '4', text: 'Night', period: '9 pm to 4 am'},
    ];

    return (
      <ComponentDoc
        name="Drop Down Menu"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nimport DropDownMenu from \'material-ui/lib/drop-down-menu\';\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <DropDownMenu menuItems={menuItems} /><br/>
          <DropDownMenu
            menuItems={menuItemsWithLabel}
            labelMember="period"
          />

          <DropDownMenu menuItems={longMenuItems} maxHeight={300} /><br/>

        </CodeExample>
      </ComponentDoc>
    );
  }

}
