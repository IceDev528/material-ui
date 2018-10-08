import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import MarkdownElement from '@material-ui/docs/MarkdownElement';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 600,
  },
  markdownElement: {
    maxWidth: theme.spacing.unit * 110,
    margin: 'auto',
    padding: theme.spacing.unit * 2,
  },
});

function HomeBackers(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <NoSsr>
        <MarkdownElement
          className={classes.markdownElement}
          text={`
## Supporting Material-UI

Material-UI is an MIT-licensed open source project.
It's an independent project with ongoing development made possible entirely
thanks to the support of these awesome [backers](/discover-more/backers/).

### Gold Sponsors

Gold Sponsors are those who have pledged $500/month and more to Material-UI.

via [Patreon](https://www.patreon.com/oliviertassinari)

<p style="display: flex;">
  <a href="https://www.creative-tim.com/?utm_source=material-ui&utm_medium=docs&utm_campaign=homepage" rel="noopener" target="_blank"><img width="126" src="https://avatars1.githubusercontent.com/u/20172349?s=378" alt="creative-tim" title="Premium Themes"></a>
  <a href="https://bitsrc.io" rel="noopener" target="_blank"><img width="96" src="https://avatars1.githubusercontent.com/u/24789812?s=192" alt="bitsrc" title="The fastest way to share code"></a>
</p>

via [OpenCollective](https://opencollective.com/material-ui)

<object type="image/svg+xml" data="https://opencollective.com/material-ui/tiers/gold-sponsors.svg?avatarHeight=80&width=600">Gold Sponsors</object>

### There is more!

See the full list of [our backers](/discover-more/backers/).

`}
        />
      </NoSsr>
    </div>
  );
}

HomeBackers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeBackers);
