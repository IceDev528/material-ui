const straightQuotes = require('./packages/markdownlint-rule-mui/straight-quotes');

module.exports = {
  config: {
    default: true,
    MD004: false, // MD004/ul-style. Buggy
    MD013: false, // MD013/line-length. Already handled by Prettier.
    MD014: false, // MD014/commands-show-output. It's OK.
    MD024: { siblings_only: true }, // MD024/no-duplicate-heading/no-duplicate-header
    MD025: {
      // Heading level
      level: 1,
      // RegExp for matching title in front matter
      front_matter_title: '',
    },
    MD033: false, // MD033/no-inline-html. We use it from time to time, it's fine.
    MD034: false, // MD034/no-bare-urls. Not a concern for us, our Markdown interpreter supports it.
    MD028: false, // MD028/no-blanks-blockquote prevent double blockquote
    MD029: false, // MD029/ol-prefix. Buggy
    MD031: false, // MD031/blanks-around-fences Some code blocks inside li
    MD036: false, // MD036/no-emphasis-as-heading/no-emphasis-as-header. It's OK.
    MD051: false, // MD051/link-fragments. Many false positives in the changelog.
    MD052: false, // MD052/reference-links-images. Many false positives in the changelog.
    straightQuotes: true,
  },
  customRules: [straightQuotes],
  ignores: ['**/node_modules/**', '**/*-zh.md', '**/*-pt.md', '.github/PULL_REQUEST_TEMPLATE.md'],
};
