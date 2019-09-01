import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Container from '@material-ui/core/Container';
import mapTranslations from 'docs/src/modules/utils/mapTranslations';

const req = require.context('docs/src/modules/components', false, /\.md$/);
const backers = mapTranslations(req, 'md');

const styles = theme => ({
  root: {
    minHeight: 600,
  },
  markdownElement: {
    padding: theme.spacing(4, 0),
  },
});

function HomeBackers(props) {
  const { classes } = props;
  const userLanguage = useSelector(state => state.options.userLanguage);

  return (
    <div className={classes.root}>
      <NoSsr>
        <Container maxWidth="md">
          <MarkdownElement className={classes.markdownElement} text={backers[userLanguage]} />
        </Container>
      </NoSsr>
    </div>
  );
}

HomeBackers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeBackers);
