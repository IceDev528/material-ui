import React from 'react';
import EventListener from 'react-event-listener';
import PropTypes from 'prop-types';
import url from 'url';
import { connect } from 'react-redux';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import loadScript from 'docs/src/modules/utils/loadScript';
import { handleEvent } from 'docs/src/modules/components/MarkdownLinks';
import compose from 'docs/src/modules/utils/compose';

let searchTimer;
let initialized = false;
let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }

  dependenciesLoaded = true;

  loadCSS(
    'https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css',
    document.querySelector('#app-search'),
  );
  loadScript(
    'https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js',
    document.querySelector('head'),
  );
}

function initDocsearch(userLanguage) {
  if (!process.browser) {
    return;
  }

  clearInterval(searchTimer);
  searchTimer = setInterval(() => {
    const docsearchInput = document.querySelector('#docsearch-input');

    if (!window.docsearch || !docsearchInput) {
      return;
    }

    if (initialized === docsearchInput) {
      clearInterval(searchTimer);
      return;
    }

    initialized = docsearchInput;
    clearInterval(searchTimer);
    window.docsearch({
      apiKey: '1d8534f83b9b0cfea8f16498d19fbcab',
      indexName: 'material-ui',
      inputSelector: '#docsearch-input',
      algoliaOptions: { facetFilters: ['version:next', `language:${userLanguage}`] },
      handleSelected: (input, event, suggestion) => {
        event.button = 0;
        const parseUrl = url.parse(suggestion.url);
        handleEvent(event, parseUrl.pathname + parseUrl.hash);
        input.close();
      },
      // debug: true, // Set debug to true if you want to inspect the dropdown.
    });
  }, 100);
}

const styles = theme => ({
  '@global': {
    '.algolia-autocomplete': {
      '& .ds-dropdown-menu': {
        boxShadow: theme.shadows[1],
        borderRadius: theme.shape.borderRadius,
        '&::before': {
          display: 'none',
        },
        '& [class^=ds-dataset-]': {
          border: 0,
          maxHeight: 'calc(100vh - 100px)',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
        },
      },
      '& .algolia-docsearch-suggestion--category-header-lvl0': {
        color: theme.palette.text.primary,
      },
      '& .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column': {
        opacity: 1,
        padding: '5.33px 10.66px',
        textAlign: 'right',
        width: '25%',
      },
      '& .algolia-docsearch-suggestion .algolia-docsearch-suggestion--content': {
        float: 'right',
        padding: '5.33px 0 5.33px 10.66px',
        width: '75%',
      },
      '& .algolia-docsearch-suggestion--subcategory-column-text': {
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightRegular,
      },
      '& .algolia-docsearch-suggestion--highlight': {
        color: theme.palette.type === 'light' ? '#174d8c' : '#acccf1',
      },
      '& .algolia-docsearch-suggestion': {
        textDecoration: 'none',
        backgroundColor: theme.palette.background.paper,
      },
      '& .algolia-docsearch-suggestion--title': theme.typography.h6,
      '& .algolia-docsearch-suggestion--text': theme.typography.body2,
      '&& .algolia-docsearch-suggestion--no-results': {
        width: '100%',
        '&::before': {
          display: 'none',
        },
      },
      '& b': {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  },
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    '& $inputInput': {
      transition: theme.transitions.create('width'),
      width: 120,
      '&:focus': {
        width: 170,
      },
    },
  },
  search: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 9),
  },
});

class AppSearch extends React.Component {
  componentDidMount() {
    loadDependencies();
  }

  handleKeyDown = event => {
    // Use event.keyCode to support IE 11
    if (
      [
        191, // '/'
        83, // 's'
      ].indexOf(event.keyCode) !== -1 &&
      document.activeElement.nodeName === 'BODY' &&
      document.activeElement !== this.inputRef
    ) {
      event.preventDefault();
      this.inputRef.focus();
    }
  };

  render() {
    const { classes, userLanguage, width } = this.props;

    if (isWidthUp('sm', width)) {
      initDocsearch(userLanguage);
    }

    return (
      <div className={classes.root} style={{ display: isWidthUp('sm', width) ? 'flex' : 'none' }}>
        <EventListener target="window" onKeyDown={this.handleKeyDown} />
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <Input
          disableUnderline
          placeholder="Search…"
          id="docsearch-input"
          inputRef={ref => {
            this.inputRef = ref;
          }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    );
  }
}

AppSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  userLanguage: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withWidth(),
  connect(state => ({
    userLanguage: state.options.userLanguage,
  })),
  withStyles(styles),
)(AppSearch);
