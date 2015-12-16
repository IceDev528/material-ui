import React from 'react';
import mui from 'material-ui';
import ComponentDoc from '../../component-doc';
import MobileTearSheet from '../../mobile-tear-sheet';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionInfo from 'material-ui/svg-icons/action/info';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentSend from 'material-ui/svg-icons/content/send';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import FileFolder from 'material-ui/svg-icons/file/folder';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {SelectableContainerEnhance} from 'material-ui/hoc/selectable-enhance';

const {
  Avatar,
  Checkbox,
  IconButton,
  List,
  Divider,
  ListItem,
  Styles,
  Toggle,
  Paper,
} = mui;

import IconMenu from 'menus/icon-menu';
import MenuItem from 'menus/menu-item';

const {Colors} = Styles;
import Code from 'lists-code';
import CodeExample from '../../code-example/code-example';
import CodeBlock from '../../code-example/code-block';
let SelectableList = SelectableContainerEnhance(List);

const Typography = Styles.Typography;
let styles = {
  headline: {
    fontSize: '24px',
    lineHeight: '32px',
    paddingTop: '16px',
    marginBottom: '12px',
    letterSpacing: '0',
    fontWeight: Typography.fontWeightNormal,
    color: Typography.textDarkBlack,
  },
  subheadline: {
    fontSize: 18,
    lineHeight: '27px',
    paddingTop: 12,
    marginBottom: 9,
    letterSpacing: '0',
    fontWeight: Typography.fontWeightNormal,
    color: Typography.textDarkBlack,
  },
  codeblock: {
    padding: 24,
    marginBottom: 32,
  },
};

function wrapState(ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState() {
      return {selectedIndex: 1};
    },
    handleUpdateSelectedIndex(e, index) {
      this.setState({
        selectedIndex: index,
      });
    },
    render() {
      return (
        <ComposedComponent {...this.props} {...this.state}
          valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}} />
      );
    },
  });
  return StateWrapper;
}

SelectableList = wrapState(SelectableList);


export default class ListsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedIndex: 1};

    this.handleUpdateSelectedIndex = (e, index) => {
      this.setState({
        selectedIndex: index,
      });
    };
  }

  render() {

    let componentInfo = [
      {
        name: 'List Props',
        infoArray: [
          {
            name: 'insetSubheader',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the subheader will be indented by 72px.',
          },
          {
            name: 'selectedItemStyle',
            type: 'object',
            header: 'optional, only available if HOC SelectableContainerEnhance is used',
            desc: 'Override the choosen inline-styles to indicate a <ListItem> is highlighted.' +
              ' You can set e.g. the background color here like this way: {{backgroundColor: #da4e49}}.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the list\'s root element.',
          },
          {
            name: 'subheader',
            type: 'node',
            header: 'optional',
            desc: 'The subheader string that will be displayed at the top of the list.',
          },
          {
            name: 'subheaderStyle',
            type: 'object',
            header: 'optional',
            desc: 'The style object to override subheader styles.',
          },
          {
            name: 'valueLink',
            type: 'valueLink',
            header: 'optional, only available if HOC SelectableContainerEnhance is used',
            desc: 'Makes List controllable. Highlights the ListItem whose index prop matches' +
              ' this "selectedLink.value". ' +
              '"selectedLink.requestChange" represents a callback function to change that value (e.g. in state).',
          },
        ],
      },
      {
        name: 'ListItem Props',
        infoArray: [
          {
            name: 'autoGenerateNestedIndicator',
            type: 'bool',
            header: 'default: true',
            desc: 'Generate a nested list indicator icon when nested list items are detected.' +
              ' Set to false if you do not want an indicator auto-generated. ' +
              'Note that an indicator will not be created if a rightIcon/Button has been specified.',
          },
          {
            name: 'disabled',
            type: 'bool',
            header: 'default: false',
            desc: `If true, the list-item will not be clickable and will not display hover affects.
This is automatically disabled if leftCheckbox or rightToggle is set.`,
          },
          {
            name: 'insetChildren',
            type: 'bool',
            header: 'default: false',
            desc: `If true, the children will be indented by 72px.
              Only needed if there is no left avatar or left icon.`,
          },
          {
            name: 'leftAvatar',
            type: 'element',
            header: 'optional',
            desc: 'This is the Avatar element to be displayed on the left side.',
          },
          {
            name: 'leftCheckbox',
            type: 'element',
            header: 'optional',
            desc: 'This is the Checkbox element to be displayed on the left side.',
          },
          {
            name: 'leftIcon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be displayed on the left side.',
          },
          {
            name: 'nestedItems',
            type: 'Array of elements',
            header: 'optional',
            desc: 'An array of ListItems to nest underneath the current ListItem.',
          },
          {
            name: 'nestedLevel',
            type: 'number',
            header: 'optional',
            desc: `Controls how deep a ListItem appears.
              This property is automatically managed so modify at your own risk.`,
          },
          {
            name: 'initiallyOpen',
            type: 'bool',
            header: 'default: false',
            desc: 'Controls whether or not the child ListItems are initially displayed.',
          },
          {
            name: 'primaryText',
            type: 'node',
            header: 'optional',
            desc: 'This is the block element that contains the primary text. If a string is passed in, a div ' +
              'tag will be rendered.',
          },
          {
            name: 'primaryTogglesNestedList',
            type: 'bool',
            header: 'default: false',
            desc: 'If provided, tapping on the primary text of the item toggles the nested list.',
          },
          {
            name: 'rightAvatar',
            type: 'element',
            header: 'optional',
            desc: 'This is the avatar element to be displayed on the right side.',
          },
          {
            name: 'rightIcon',
            type: 'element',
            header: 'optional',
            desc: 'This is the SvgIcon or FontIcon to be displayed on the right side.',
          },
          {
            name: 'rightIconButton',
            type: 'element',
            header: 'optional',
            desc: 'This is the IconButton to be displayed on the right side. Hovering over this button will ' +
              'remove the ListItem hover. Also, clicking on this button will not trigger a ListItem ripple. The ' +
              'event will be stopped and prevented from bubbling up to cause a ListItem click.',
          },
          {
            name: 'rightToggle',
            type: 'element',
            header: 'optional',
            desc: 'This is the Toggle element to display on the right side.',
          },
          {
            name: 'secondaryText',
            type: 'node',
            header: 'optional',
            desc: 'This is the block element that contains the secondary text. If a string is passed in, a div ' +
              'tag will be rendered.',
          },
          {
            name: 'secondaryTextLines',
            type: 'oneOf [1,2]',
            header: 'default: 1',
            desc: 'Can be 1 or 2. This is the number of secondary text lines before ellipsis will show.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the list item\'s root element.',
          },
          {
            name: 'value',
            type: 'number',
            header: 'optional, only available if HOC SelectableContainerEnhance is used',
            desc: `If valueLink prop is passed to List component, this prop is also required.
              It assigns an identifier to the listItem so that it can be hightlighted by the List.`,
          },
        ],
      },
      {
        name: 'ListItem Events',
        infoArray: [
          {
            name: 'onKeyboardFocus',
            type: 'function(event, isKeyboardFocused)',
            header: 'optional',
            desc: 'Called when the ListItem has keyboard focus.',
          },
          {
            name: 'onMouseLeave',
            type: 'function(event)',
            header: 'optional',
            desc: 'Called when the mouse is no longer over the ListItem.',
          },
          {
            name: 'onMouseEnter',
            type: 'function(event)',
            header: 'optional',
            desc: 'Called when the mouse is over the ListItem.',
          },
          {
            name: 'onNestedListToggle',
            type: 'function(this)',
            header: 'optional',
            desc: 'Called when the ListItem toggles its nested ListItems.',
          },
          {
            name: 'onTouchStart',
            type: 'function(event)',
            header: 'optional',
            desc: 'Called when touches start.',
          },
          {
            name: 'onTouchTap',
            type: 'function(event)',
            header: 'optional',
            desc: 'Called when a touch tap event occures on the component.',
          },
        ],
      },
    ];

    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    );

    let rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <ComponentDoc
        name="Lists"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            `//Import statement:
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';

//See material-ui/lib/index.js for more
            `
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <MobileTearSheet>
            <List>
              <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
              <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
              <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
              <ListItem primaryText="Drafts"leftIcon={<ContentDrafts />} />
              <ListItem primaryText="Inbox"leftIcon={<ContentInbox />} />
            </List>
            <Divider />
            <List>
              <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
              <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List subheader="Recent chats">
              <ListItem
                primaryText="Brendan Lim"
                leftAvatar={<Avatar src="images/ok-128.jpg" />}
                rightIcon={<CommunicationChatBubble />} />
              <ListItem
                primaryText="Eric Hoffman"
                leftAvatar={<Avatar src="images/kolage-128.jpg" />}
                rightIcon={<CommunicationChatBubble />} />
              <ListItem
                primaryText="Grace Ng"
                leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
                rightIcon={<CommunicationChatBubble />} />
              <ListItem
                primaryText="Kerem Suer"
                leftAvatar={<Avatar src="images/kerem-128.jpg" />}
                rightIcon={<CommunicationChatBubble />} />
              <ListItem
                primaryText="Raquel Parrado"
                leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
                rightIcon={<CommunicationChatBubble />} />
            </List>
            <Divider />
            <List subheader="Previous chats">
              <ListItem
                primaryText="Chelsea Otakan"
                leftAvatar={<Avatar src="images/chexee-128.jpg" />} />
              <ListItem
                primaryText="James Anderson"
                leftAvatar={<Avatar src="images/jsa-128.jpg" />} />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List>
              <ListItem
                primaryText="Chelsea Otakan"
                leftIcon={<ActionGrade color={Colors.pinkA200} />}
                rightAvatar={<Avatar src="images/chexee-128.jpg" />} />
              <ListItem
                primaryText="Eric Hoffman"
                insetChildren={true}
                rightAvatar={<Avatar src="images/kolage-128.jpg" />} />
              <ListItem
                primaryText="James Anderson"
                insetChildren={true}
                rightAvatar={<Avatar src="images/jsa-128.jpg" />} />
              <ListItem
                primaryText="Kerem Suer"
                insetChildren={true}
                rightAvatar={<Avatar src="images/kerem-128.jpg" />} />
            </List>
            <Divider inset={true} />
            <List>
              <ListItem
                primaryText="Adelle Charles"
                leftAvatar={<Avatar color={Colors.pinkA200} backgroundColor={Colors.transparent}
                  style={{left: 8}}>A</Avatar>}
                rightAvatar={<Avatar src="images/adellecharles-128.jpg" />} />
              <ListItem
                primaryText="Adham Dannaway"
                insetChildren={true}
                rightAvatar={<Avatar src="images/adhamdannaway-128.jpg" />} />
              <ListItem
                primaryText="Allison Grayce"
                insetChildren={true}
                rightAvatar={<Avatar src="images/allisongrayce-128.jpg" />} />
              <ListItem
                primaryText="Angel Ceballos"
                insetChildren={true}
                rightAvatar={<Avatar src="images/angelceballos-128.jpg" />} />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List subheader="Folders" insetSubheader={true}>
              <ListItem
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightIcon={<ActionInfo />}
                primaryText="Photos"
                secondaryText="Jan 9, 2014" />
              <ListItem
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightIcon={<ActionInfo />}
                primaryText="Recipes"
                secondaryText="Jan 17, 2014" />
              <ListItem
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightIcon={<ActionInfo />}
                primaryText="Work"
                secondaryText="Jan 28, 2014" />
            </List>
            <Divider inset={true} />
            <List subheader="Files" insetSubheader={true}>
              <ListItem
                leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={Colors.blue500} />}
                rightIcon={<ActionInfo />}
                primaryText="Vacation itinerary"
                secondaryText="Jan 20, 2014" />
              <ListItem
                leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={Colors.yellow600} />}
                rightIcon={<ActionInfo />}
                primaryText="Kitchen remodel"
                secondaryText="Jan 10, 2014" />
            </List>
          </MobileTearSheet>
          <MobileTearSheet>
            <List subheader="Nested List Items">
              <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
              <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
              <ListItem
                primaryText="Inbox"
                leftIcon={<ContentInbox />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />,
                  <ListItem
                    primaryText="Sent Mail"
                    leftIcon={<ContentSend />}
                    nestedItems={[
                      <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                    ]}
                  />,
                ]}
              />
            </List>
          </MobileTearSheet>
          <MobileTearSheet>
            <List subheader="General">
              <ListItem
                primaryText="Profile photo"
                secondaryText="Change your Google+ profile photo" />
              <ListItem
                primaryText="Show your status"
                secondaryText="Your status is visible to everyone you use with" />
            </List>
            <Divider />
            <List subheader="Hangout notifications">
              <ListItem
                leftCheckbox={<Checkbox />}
                primaryText="Notifications"
                secondaryText="Allow notifications" />
              <ListItem
                leftCheckbox={<Checkbox />}
                primaryText="Sounds"
                secondaryText="Hangouts message" />
              <ListItem
                leftCheckbox={<Checkbox />}
                primaryText="Video sounds"
                secondaryText="Hangouts video call" />
            </List>
          </MobileTearSheet>
          <MobileTearSheet>
            <List>
              <ListItem
                primaryText="When calls and notifications arrive"
                secondaryText="Always interrupt" />
            </List>
            <Divider />
            <List subheader="Priority interruptions">
              <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
              <ListItem primaryText="Calls" rightToggle={<Toggle />} />
              <ListItem primaryText="Messages" rightToggle={<Toggle />} />
            </List>
            <Divider />
            <List subheader="Hangout notifications">
              <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
              <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
              <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List>
              <ListItem
                leftIcon={<CommunicationCall color={Colors.indigo500} />}
                rightIcon={<CommunicationChatBubble />}
                primaryText="(650) 555 - 1234"
                secondaryText="Mobile" />
              <ListItem
                insetChildren={true}
                rightIcon={<CommunicationChatBubble />}
                primaryText="(323) 555 - 6789"
                secondaryText="Work" />
            </List>
            <Divider inset={true} />
            <List>
              <ListItem
                leftIcon={<CommunicationEmail color={Colors.indigo500} />}
                primaryText="aliconnors@example.com"
                secondaryText="Personal" />
              <ListItem
                insetChildren={true}
                primaryText="ali_connors@example.com"
                secondaryText="Work" />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List subheader="Today">
              <ListItem
                leftAvatar={<Avatar src="images/ok-128.jpg" />}
                primaryText="Brunch this weekend?"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
                    I&apos;ll be in your neighborhood this weekend.
                  </p>
                } />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kolage-128.jpg" />}
                primaryText={
                  <p>Summer BBQ&nbsp;&nbsp;<span style={{color: Colors.lightBlack}}>4</span></p>
                }
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>to me, Scott, Jennifer</span> --
                    Wish I could but I can
                  </p>
                } />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
                primaryText="Oui oui"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Grace Ng</span> --
                    Do you have Paris recommendations?
                  </p>
                } />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kerem-128.jpg" />}
                primaryText="Birthday gift"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Kerem Suer</span> --
                    Do you have any ideas on what I
                  </p>
                } />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
                primaryText="Recipe to try"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Raquel Parrado</span> --
                    We should eat this: grated cheese
                  </p>
                } />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/chexee-128.jpg" />}
                primaryText="Giants game"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Chelsea Otakan</span> --
                    Any interest in seeing the Giants
                  </p>
                } />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List subheader="Today">
              <ListItem
                leftAvatar={<Avatar src="images/ok-128.jpg" />}
                primaryText="Brunch this weekend?"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
                    I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kolage-128.jpg" />}
                primaryText={
                  <p>Summer BBQ&nbsp;&nbsp;<span style={{color: Colors.lightBlack}}>4</span></p>
                }
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>to me, Scott, Jennifer</span> --
                    Wish I could come, but I&apos;m out of town this weekend.
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
                primaryText="Oui oui"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Grace Ng</span> --
                    Do you have Paris recommendations? Have you ever been?
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kerem-128.jpg" />}
                primaryText="Birdthday gift"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Kerem Suer</span> --
                    Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
                primaryText="Recipe to try"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Raquel Parrado</span> --
                    We should eat this: grated squash. Corn and tomatillo tacos.
                  </p>
                }
                secondaryTextLines={2} />
            </List>
          </MobileTearSheet>

          <MobileTearSheet>
            <List subheader="Today">
              <ListItem
                leftAvatar={<Avatar src="images/ok-128.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Brendan Lim"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Brunch this weekend?</span><br/>
                    I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kolage-128.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="me, Scott, Jennifer"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Summer BBQ</span><br/>
                    Wish I could come, but I&apos;m out of town this weekend.
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Grace Ng"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Oui oui</span><br/>
                    Do you have any Paris recs? Have you ever been?
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/kerem-128.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Kerem Suer"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Birthday gift</span><br/>
                    Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Raquel Parrado"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Recipe to try</span><br/>
                    We should eat this: grated squash. Corn and tomatillo tacos.
                  </p>
                }
                secondaryTextLines={2} />
            </List>
          </MobileTearSheet>
          <MobileTearSheet>
            <SelectableList
              value={3}
              subheader="SelectableContacts">

              <ListItem
                value={1}
                primaryText="Brendan Lim"
                leftAvatar={<Avatar src="images/ok-128.jpg" />} />
              <ListItem value={2}
                primaryText="Grace Ng"
                leftAvatar={<Avatar src="images/uxceo-128.jpg" />} />
              <ListItem value={3}
                primaryText="Kerem Suer"
                leftAvatar={<Avatar src="images/kerem-128.jpg" />} />
              <ListItem value={4}
                primaryText="Eric Hoffman"
                leftAvatar={<Avatar src="images/kolage-128.jpg" />} />
              <ListItem value={5}
                primaryText="Raquel Parrado"
                leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />} />
            </SelectableList>
          </MobileTearSheet>
        </CodeExample>

        <Paper style={{padding: '24px', marginBottom: '32px'}}>
        <div>
          <h2 style={styles.headline}>Selectable Lists</h2>
          <p>
            Basically three steps are needed:
          </p>
          <ul>
            <li>enhance <code>&lt;List&gt;</code> with HOC</li>
            <li>decide where to put state</li>
            <li>implement and set valueLink</li>
          </ul>


          <h3 style={styles.subheadline}> Enhance List</h3>
          <p>
            Wrapping the <code>&lt;List&gt;</code> component with the higher order component "SelectableEnhance" enables
            the clicked <code>&lt;ListItem&gt;</code> to be highlighted.
          </p>
          <div style={styles.codeblock}>
            <CodeBlock>
 {`import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
.
.
.
var SelectableList = SelectableContainerEnhance(List);
`}
            </CodeBlock>
          </div>


          <h3 style={styles.subheadline}>Where to put state</h3>
          <p>
            If this component is used in conjunction with flux or redux this is a no-brainer. The callback-handler
            just has to update the store. Otherwise the state can be held within e.g the parent, but it is to be to
            considered that each time a <code>&lt;ListItem&gt;</code>
            is clicked, the state will update and the parent - including it's
            children - will rerender.
          </p>
          <p>
            A possible solution for this is to use another hoc. An example can be found in the sourcecode
            of <code>docs/src/app/components/pages/components/lists.jsx</code>.
          </p>
          <h3 style={styles.subheadline}>The valueLink</h3>
          <p>
            The prop 'valueLink' of <code>&lt;List&gt;</code> has to be set, to make the highlighting controllable:
          </p>
          <div style={styles.codeblock}>
            <CodeBlock>
{`valueLink={{
    value: this.state.selectedIndex,
    requestChange: this.handleUpdateSelectedIndex}}
`}
            </CodeBlock>
          </div>
          A sample implementation might look like this.
          <div style={styles.codeblock}>
            <CodeBlock>
{`getInitialState() {
 return { selectedIndex: 1 };
},
handleUpdateSelectedIndex(e,index) {
  this.setState({
    selectedIndex: index,
});
`}
            </CodeBlock>
          </div>
          <h3 style={styles.subheadline}>Adjust the <code>&lt;ListItem&gt;</code></h3>
          <p>
            The prop "value" on each ListItem has to be set. This makes the item addressable for the callback.
          </p>
        </div>
        </Paper>
      </ComponentDoc>
    );

  }
}
