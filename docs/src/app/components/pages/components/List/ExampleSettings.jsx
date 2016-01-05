import React from 'react';
import MobileTearSheet from '../../../MobileTearSheet';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';
import Toggle from 'material-ui/lib/toggle';

const ListExampleSettings = () => (
  <div>
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
  </div>
);

export default ListExampleSettings;
