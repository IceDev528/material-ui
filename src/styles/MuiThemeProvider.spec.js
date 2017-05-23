// @flow

import { stub } from 'sinon';
import { assert } from 'chai';
import { create } from 'jss';
import path from 'path';
import fs from 'fs';
import jssPreset from 'jss-preset-default';
import { createStyleManager } from 'jss-theme-reactor';
import React from 'react';
import htmlLooksLike from 'html-looks-like';
import { renderToString } from 'react-dom/server';
import { createMount } from '../test-utils';
import { createMuiTheme } from '../styles';
import Button from '../Button';
import MuiThemeProvider from './MuiThemeProvider';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('<MuiThemeProvider />', () => {
  describe('server side', () => {
    // Only run the test on node.
    if (!/Node.js/.test(window.navigator.userAgent)) {
      return;
    }

    let theme;
    let styleManager;

    before(() => {
      theme = createMuiTheme();
      const jss = create(jssPreset());
      styleManager = createStyleManager({ jss, theme });
    });

    after(() => {
      styleManager.reset();
    });

    it('should be able to extract the styles', () => {
      const markup = renderToString(
        <MuiThemeProvider theme={theme} styleManager={styleManager}>
          <Button>
            Hello World
          </Button>
        </MuiThemeProvider>,
      );

      htmlLooksLike(
        markup,
        `
        <button
          tabindex="0"
          class="MuiButtonBase-buttonBase-3170508663 MuiButton-root-3593367901"
          type="button"
          data-reactroot=""
          data-reactid="1"
          data-react-checksum="-1899863948"
        >
          <span class="MuiButton-label-49836587" data-reactid="2">
            Hello World
          </span>
          <span class="MuiTouchRipple-root-3868442396" data-reactid="3"></span>
        </button>
      `,
      );

      const expected = fs.readFileSync(
        path.join(__dirname, 'MuiThemeProvider.spec.output.css'),
        'utf-8',
      );
      assert.strictEqual(styleManager.sheetsToString(), trim(expected));
    });
  });

  describe('react component', () => {
    let mount;
    let child;
    let wrapper;
    let instance;

    let themeObj;
    let styleManagerObj;

    before(() => {
      mount = createMount();
      child = <div />;
      wrapper = mount(<MuiThemeProvider>{child}</MuiThemeProvider>);
      instance = wrapper.instance();

      themeObj = { themeObjProperty: 'woof' };
      styleManagerObj = { styleManagerObjProperty: 'woof' };
      stub(MuiThemeProvider, 'createDefaultContext').returns({
        theme: themeObj,
        styleManager: styleManagerObj,
      });
    });

    after(() => {
      mount.cleanUp();
      MuiThemeProvider.createDefaultContext.restore();
    });

    describe('setProps() with different styleManager', () => {
      before(() => {
        MuiThemeProvider.createDefaultContext.resetHistory();
        wrapper.setProps({});
      });

      it('should call createDefaultContext() exactly once', () => {
        assert.strictEqual(MuiThemeProvider.createDefaultContext.callCount, 1);
      });

      it('should set instance.theme to createDefaultContext().theme', () => {
        assert.property(instance, 'theme');
        assert.property(instance.theme, 'themeObjProperty');
        assert.strictEqual(instance.theme.themeObjProperty, themeObj.themeObjProperty);
      });

      it('should set instance.styleManager to createDefaultContext().theme', () => {
        assert.property(instance, 'styleManager');
        assert.property(instance.styleManager, 'styleManagerObjProperty');
        assert.strictEqual(
          instance.styleManager.styleManagerObjProperty,
          styleManagerObj.styleManagerObjProperty,
        );
      });
    });

    describe('setProps() with same styleManager', () => {
      let updateThemeStub;
      let nextProps;

      before(() => {
        MuiThemeProvider.createDefaultContext.resetHistory();
        updateThemeStub = stub();
        instance.styleManager.updateTheme = updateThemeStub;
        nextProps = {
          styleManager: instance.styleManager,
          theme: {
            themeProperty: 'woof',
          },
        };
        wrapper.setProps(nextProps);
      });

      it('should not call createDefaultContext() at all', () => {
        assert.strictEqual(MuiThemeProvider.createDefaultContext.callCount, 0);
      });

      it('should set instance.theme to nextProps.theme', () => {
        assert.strictEqual(instance.theme, nextProps.theme);
      });

      it('should call instance.styleManager.updateTheme() exactly once', () => {
        assert.strictEqual(instance.styleManager.updateTheme.callCount, 1);
      });

      it('should call instance.styleManager.updateTheme() with instance.theme', () => {
        assert.strictEqual(instance.styleManager.updateTheme.calledWith(instance.theme), true);
      });
    });
  });
});
