# コンポーネントのカスタマイズ

<p class="description">Material-UIコンポーネントの外観を簡単にカスタマイズできます。</p>

コンポーネントはさまざまなコンテキストで使用できるため、これにはいくつかのアプローチがあります。 最小のユースケースから最大のユースケースまで、次をご覧ください

1. [一時的な状況の特定のバリエーション](#1-specific-variation-for-a-one-time-situation)
2. [1回の状況に対する動的変化](#2-dynamic-variation-for-a-one-time-situation)
3. 異なるコンテキストで再使用される[特定のバリエーションのコンポーネント](#3-specific-variation-of-a-component)
4. [Material Design variations](#4-material-design-variations)のボタンコンポーネントなど
5. [グローバルテーマバリエーション](#5-global-theme-variation)

## 1. 一時的な状況の特定のバリエーション

次のソリューションを使用できる特定の実装のコンポーネントのスタイルを変更する必要がある場合があります。

### クラス名でスタイルをオーバーライドする

コンポーネントのスタイルをオーバーライドする最初の方法は、**class names**を使用することです。 すべてのコンポーネントには、常にルート要素に適用される`className`プロパティがあります。

この例では、[`withStyles()`](/styles/basics/#higher-order-component-api)の高次(higher-order) を使用します。 コンポーネントの`classes`プロパティを使用して、カスタムスタイルをDOMに挿入し、クラス名を`ClassNames`コンポーネントに渡します。 他のスタイリングソリューション</a>、またはプレーンCSSを選択してスタイルを作成することもできますが、必ず CSSがDOMに注入されるときの[CSS注入順序](/styles/advanced/#css-injection-order)を考えてみてください。 Material-UIを使用してコンポーネントをスタイル設定すると、`<link>`が下に挿入されるため、高い特異性が得られます。 の`<head />`を使用して、コンポーネントが常に正しくレンダリングされるようにします。

{{"demo": "pages/customization/components/ClassNames.js"}}

### クラスでスタイルをオーバーライドする

`className`プロパティでは不十分で、より深い要素にアクセスする必要がある場合は、`classes`オブジェクトプロパティを利用して、特定のコンポーネントに対してMaterial-UIによって注入されるすべてのCSSをカスタマイズできます。

それぞれのクラスのリスト コンポーネントについては、コンポーネントAPIページの**CSS section**および**rule name column**を参照してください。 例えば、[Button CSS API](/api/button/#css)で見ることができます。 文 または、[browser dev tools](#using-the-dev-tools)を使用することもできます。

この例では、`withStyles()`</code></code>も使用していますが、ここでは、`ClassesNesting(上記参照) は<code>Button`の`classes propを使用して、
オーバーライドするクラスの<strong>名</strong>を適用するCSSクラス名(スタイルルール)</strong>にマップするオブジェクトを提供します(values)。
コンポーネントの既存のクラスは引き続き注入されるため、必要なのは特定のスタイルを指定することだけです。
追加またはオーバーライドします。</p>

<p>Notice that in addition to the button styling, the button label's capitalization has been changed:</p>

<p>{{"demo": "pages/customization/components/ClassesNesting.js"}}</p>

<h3>グローバルクラス名でスタイルをオーバーライドする</h3>

<p><a href="/styles/advanced/#with-material-ui-core">このセクションに従ってください</a> 。</p>

<h3>開発ツール(dev tools) を使用する</h3>

<p>ブラウザ開発ツールを使えば、時間を大幅に節約できます。
Material-UIのクラス名は、開発モードでは<a href="/styles/advanced/#class-names"> a simple patternに従います</a>。
<code>Mui[component name]-[style rule name]-[UUID]`。

上記のデモに戻りましょう。 ボタン・ラベルを上書きする方法は?

![dev-tools](/static/images/customization/dev-tools.png)

開発ツールを使用して、`Button`コンポーネントと`label`スタイルルールをターゲットにする必要があることがわかります。

```jsx
<Button classes={{ label: 'my-class-name' }} />
```

### ショートハンド

上記のコード例は、子コンポーネントとして**同じCSS API**を使用することで要約できます。 この例では、`withStyles()`の上位(高次) コンポーネントは、[`Button`コンポーネント](/api/button/#css)が使用する`classes`プロパティーを注入しています。

```jsx
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);
```

{{"demo": "pages/customization/components/ClassesShorthand.js"}}

### 擬似クラス

*hover*、*focus*、*disabled*、*selected*などのコンポーネントの特殊状態は、より高いCSS 特異性(specificity) が設定されています。 [Specificityは、特定のCSS宣言に適用されるウェイト](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)です。

コンポーネントの特別な状態をオーバーライドするには、**特異性を高める必要があります** 。 *disable*状態と、 **pseudo-class**(`:disabled`)を使用したボタンコンポーネントの例を示します。

```css
.Button {
  color: black;
}
.Button:disabled { /* Increase the specificity */
  color: white;
}
```

```jsx
<Button disabled className="Button">
```

時にはこのプラットフォームではstateとして**pseudo-class**は使うことができない。 メニュー項目の構成要素と*選ばれた*例として述べる。 ネストされた要素にアクセスする以外にも、`classes`プロパティを使用して、Material-UIコンポーネントの特殊な状態をカスタマイズできます。

```css
.MenuItem {
  color: black;
}
.MenuItem.selected { /* Increase the specificity */
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'MenuItem', selected: 'selected' }}>
```

#### 1つのコンポーネント状態をオーバーライドするために、特異性を高める必要があるのはなぜですか。

設計上、CSS仕様では疑似クラスを使用することで、特定性を高めています。 一貫性を保つために、Material-UIはそのカスタム擬似クラスの特異性を高めます。 これには重要な利点が1つあり、カスタマイズしたい状態を選択することができます。

#### より少ない定型文を必要とする別のAPIを使用できますか?

`classes` prop APIに値を指定する代わりに、Material-UIによって生成される[the global class names](/styles/advanced/#with-material-ui-core) を使用できます。 これらすべてのカスタム擬似クラスを実装します。

| クラスキー        | グローバルクラス名        |
|:------------ |:---------------- |
| チェック済み       | Mui-checked      |
| 無効           | Mui-disabled     |
| エラー          | Mui-error        |
| focused      | Mui-focused      |
| focusVisible | Mui-focusVisible |
| 必須           | Mui-required     |
| 展開済み         | Mui-expanded     |
| 選択済み         | Mui-selected     |


```css
.MenuItem {
  color: black;
}
.MenuItem.Mui-selected { /* Increase the specificity */
  color: blue;
}
```

```jsx
<MenuItem selected className="MenuItem">
```

### 同じスタイルシート内のローカルルールを参照するには、`$ruleName`を使用します

[jss-nested](https://github.com/cssinjs/jss-nested)プラグイン(デフォルトで使用可能) は、特異性を高めるプロセスを容易にします。

```js
const styles = {
  root: {
    '&$disabled': {
      color: 'white',
    },
  },
  disabled: {},
};
```

コンパイル：

```css
.root-x.disable-x {
  color: white;
}
```

⚠️DOMを機能させるには、生成された二つのクラス名(`root`&`disabled`) を適用する必要があります。

```jsx
<Button
  disabled
  classes={{
    root: classes.root, // class name, e.g. `root-x`
    disabled: classes.disabled, // class name, e.g. `disabled-x`
  }}
>
```

{{"demo": "pages/customization/components/ClassesState.js"}}

### インラインスタイルでオーバーライドする

コンポーネントのスタイルをオーバーライドするもう一つの方法は、 **inline-style**アプローチを使用することです。 すべてのコンポーネントには、`style` プロパティがあります。 これらのプロパティは常にルート要素に適用されます。

インラインスタイルは通常のCSSよりも優先されるため、CSSの特異性について心配する必要はありません。

{{"demo": "pages/customization/components/InlineStyle.js"}}

[inline-styleもしくはclassesどちらを使うべきですか？](/getting-started/faq/#when-should-i-use-inline-style-vs-classes)

## 2. 1回の状況に対する動的変化

前のセクションでMaterial-UIコンポーネントのスタイルをオーバーライドする方法を学習しました。 では、これらのオーバーライドを動的にする方法を見てみましょう。 5つの選択肢があります。それぞれに長所と短所があります。

### 動的CSS

{{"demo": "pages/customization/components/DynamicCSS.js"}}

### クラス名のブランチ

{{"demo": "pages/customization/components/DynamicClassName.js"}}

### CSS変数

{{"demo": "pages/customization/components/DynamicCSSVariables.js"}}

### インラインスタイル

{{"demo": "pages/customization/components/DynamicInlineStyle.js"}}

### ネストテーマ

{{"demo": "pages/customization/components/DynamicThemeNesting.js"}}

## 3. コンポーネントの特定のバリエーション

コンポーネントのバリエーションを作成し、製品ページのカラフルなボタンなど、さまざまなコンテキストで使用する必要があるかもしれませんが、コードは[*DRYにしておいた方がよいでしょう*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)。

最も良い方法は、オプション1を実行し、カスタマイズしたコンポーネントをエクスポートして必要な場所で使用することにより、Reactの合成能力を活用することです。

{{"demo": "pages/customization/components/Component.js", "hideEditButton": true}}

## 4. Material Designのバリエーション

Material Design仕様には、ボタンの形状が異なるなど、特定のコンポーネントのさまざまなバリエーションが記載されています。たとえば、[text](https://material.io/design/components/buttons.html#text-button)(以前の"flat")、[contained](https://material.io/design/components/buttons.html#contained-button)(以前の "raised")、[FAB](https://material.io/design/components/buttons-floating-action-button.html)などです。

Material-UIは、これらすべてのバリエーションを実装しようとします。 サポートされているMaterial Design コンポーネントの現在のステータスについては、[Supported Components](/getting-started/supported-components/)のマニュアルを参照してください。

## 5. グローバルテーマバリエーション

コンポーネント間の一貫性を促進し、ユーザーインターフェイスの外観全体を管理するために、Material-UIはグローバルな変更を適用するメカニズムを提供します。

このセクションのデモでは、ボタンのフォントサイズを変更する方法について説明します。

### テーマ変数

[テーマ設定変数を調整できます](/customization/theming/#theme-configuration-variables) 。

```jsx
const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "pages/customization/components/ThemeVariables.js"}}

### グローバルCSSのオーバーライド

CSSを使用してコンポーネントのすべてのインスタンスをカスタマイズすることもできます。 Components expose [global class names](/styles/advanced/#with-material-ui-core) to enable this. Bootstrapをカスタマイズする方法と非常によく似ています。

```jsx
const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiButton-root': {
      fontSize: '1rem',
    },
  },
})(() => null);

// …

<GlobalCss />
```

{{"demo": "pages/customization/components/GlobalCssOverride.js", "iframe": true, "height": 70}}

### グローバルテーマオーバーライド

`theme`の`overrides`キーを利用すると、Material-UIによってDOMに注入されるすべてのスタイルを潜在的に変更できます。 詳細については、ドキュメントの[テーマセクションをご覧ください](/customization/globals/#css)。

```jsx
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});
```

{{"demo": "pages/customization/components/GlobalThemeOverride.js"}}