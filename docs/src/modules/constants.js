const { LANGUAGES } = require('../../config');

const CODE_VARIANTS = {
  JS: 'JS',
  TS: 'TS',
};

// Server side rendered languages
const LANGUAGES_SSR = ['en'];

// Work in progress
const LANGUAGES_IN_PROGRESS = LANGUAGES.slice();

// Valid languages to use in production
const LANGUAGES_LABEL = [
  {
    code: 'en',
    text: 'English',
  },
];

const LANGUAGES_IGNORE_PAGES = (pathname) => {
  // We don't have the bandwidth like Qt to translate our blog posts
  // https://www.qt.io/zh-cn/blog
  if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    return true;
  }

  if (pathname === '/size-snapshot/') {
    return true;
  }

  return false;
};

module.exports = {
  CODE_VARIANTS,
  LANGUAGES,
  LANGUAGES_SSR,
  LANGUAGES_LABEL,
  LANGUAGES_IN_PROGRESS,
  LANGUAGES_IGNORE_PAGES,
};
