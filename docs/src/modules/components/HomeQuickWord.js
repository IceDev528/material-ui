import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Link from 'docs/src/modules/components/Link';

const backers = [
  {
    href:
      'https://tidelift.com/subscription/pkg/npm-material-ui?utm_source=material_ui&utm_medium=referral&utm_campaign=homepage',
    alt: 'tidelift',
    title: 'Tidelift — Enterprise-ready open source software',
  },
  {
    href: 'https://bit.dev',
    alt: 'bitsrc',
    title: 'Bitsrc — The fastest way to share code',
  },
  {
    href: 'https://www.call-em-all.com',
    alt: 'callemall',
    title: 'Call-Em-All - The easy way to message your group',
  },
];

const styles = theme => ({
  root: {
    textAlign: 'center',
    minHeight: 60,
    paddingBottom: theme.spacing(2),
  },
});

function HomeQuickWord(props) {
  const { classes } = props;
  const t = useSelector(state => state.options.t);
  const backer = backers[Math.floor(backers.length * Math.random())];

  return (
    <div className={classes.root}>
      <Typography variant="caption">{t('homeQuickWord')}</Typography>
      <NoSsr>
        <Link
          variant="body2"
          display="block"
          data-ga-event-category="sponsors"
          data-ga-event-action="quick-word"
          data-ga-event-label={backer.alt}
          href={backer.href}
          target="_blank"
          rel="noopener nofollow"
        >
          {backer.title}
        </Link>
      </NoSsr>
    </div>
  );
}

HomeQuickWord.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeQuickWord);
