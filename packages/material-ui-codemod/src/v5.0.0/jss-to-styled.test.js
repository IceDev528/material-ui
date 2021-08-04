import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './jss-to-styled';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('jss-to-styled', () => {
      describe('first', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/first.actual.js'),
              path: require.resolve('./jss-to-styled.test/first.actual.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/first.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/first.expected.js'),
              path: require.resolve('./jss-to-styled.test/first.expected.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/first.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('second', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/second.actual.js'),
              path: require.resolve('./jss-to-styled.test/second.actual.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/second.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/second.expected.js'),
              path: require.resolve('./jss-to-styled.test/second.expected.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/second.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('third', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/third.actual.js'),
              path: require.resolve('./jss-to-styled.test/third.actual.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/third.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/third.expected.js'),
              path: require.resolve('./jss-to-styled.test/third.expected.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/third.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('fourth', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/fourth.actual.js'),
              path: require.resolve('./jss-to-styled.test/fourth.actual.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/fourth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/fourth.expected.js'),
              path: require.resolve('./jss-to-styled.test/fourth.expected.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/fourth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('fifth', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/fifth.actual.js'),
              path: require.resolve('./jss-to-styled.test/fifth.actual.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/fifth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/fifth.expected.js'),
              path: require.resolve('./jss-to-styled.test/fifth.expected.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/fifth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('sixth', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/sixth.actual.js'),
              path: require.resolve('./jss-to-styled.test/sixth.actual.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/sixth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/sixth.expected.js'),
              path: require.resolve('./jss-to-styled.test/sixth.expected.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/sixth.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('seventh', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/seventh.actual.js'),
              path: require.resolve('./jss-to-styled.test/seventh.actual.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/seventh.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/seventh.expected.js'),
              path: require.resolve('./jss-to-styled.test/seventh.expected.js'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/seventh.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('with createStyles', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/withCreateStyles.actual.tsx'),
              path: require.resolve('./jss-to-styled.test/withCreateStyles.actual.tsx'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/withCreateStyles.expected.tsx');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./jss-to-styled.test/withCreateStyles.expected.tsx'),
              path: require.resolve('./jss-to-styled.test/withCreateStyles.expected.tsx'),
            },
            { jscodeshift },
            {},
          );

          const expected = read('./jss-to-styled.test/withCreateStyles.expected.tsx');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });
    });

    describe('with createStyles on withStyles', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles1.actual.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles1.actual.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles1.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles1.expected.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles1.expected.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles1.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('with createStyles on withStyles directly', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles2.actual.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles2.actual.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles2.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles2.expected.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles2.expected.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles2.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('with createStyles directly', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles3.actual.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles3.actual.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles3.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/withCreateStyles3.expected.tsx'),
            path: require.resolve('./jss-to-styled.test/withCreateStyles3.expected.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-styled.test/withCreateStyles3.expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
