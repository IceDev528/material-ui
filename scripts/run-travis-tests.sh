#!/bin/bash
set -ev
npm run lint
npm run test:coverage
npm run test:karma
cat ./test/coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
if git log ${TRAVIS_COMMIT_RANGE} | grep -Ei '\[codemod\]'; then
  cd packages/material-ui-codemod && npm install && npm test
fi
