import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, Route, MemoryRouter } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default function ListRouter() {
  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      <Box sx={{ width: 360 }}>
        <Route>
          {({ location }) => (
            <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
              Current route: {location.pathname}
            </Typography>
          )}
        </Route>
        <Paper elevation={0}>
          <List aria-label="main mailbox folders">
            <ListItemLink to="/inbox" primary="Inbox" icon={<InboxIcon />} />
            <ListItemLink to="/drafts" primary="Drafts" icon={<DraftsIcon />} />
          </List>
          <Divider />
          <List aria-label="secondary mailbox folders">
            <ListItemLink to="/trash" primary="Trash" />
            <ListItemLink to="/spam" primary="Spam" />
          </List>
        </Paper>
      </Box>
    </MemoryRouter>
  );
}
