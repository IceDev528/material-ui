import * as React from 'react';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'gatsby-theme-material-ui';
import ProTip from '../components/ProTip';
import Copyright from '../components/Copyright';

export default function About() {
  return (
    <StyledEngineProvider injectFirst>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gatsby v5-alpha example
          </Typography>
          <Link to="/">Go to the main page</Link>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </StyledEngineProvider>
  );
}
