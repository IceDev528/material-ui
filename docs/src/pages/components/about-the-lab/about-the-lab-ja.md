# About the lab

<p class="description">このパッケージは、まだコアに移動する準備ができていないインキュベーター・コンポーネントをホストします。</p>

Labパッケージとcoreパッケージの明確な違いはどのようにバージョン管理されるかです。 Coreパッケージは[slower-moving policy](https://material-ui.com/versions/#release-frequency). を基にバージョン管理されます。 対してLabパッケージは必要に応じて破壊的な変更が加えられる可能性があります。

開発者としてlabパッケージのコンポーネントをテスト/使用し、不具合や、使いにくさ、デザインなどについて報告する事ができます。そうする事によってLab パッケージのコンポーネントをより良くする事ができます。 みなさんが使ってくれれば使ってくれるほど、将来的に起きうる重大な問題を早期に発見・改善する事ができます。

Coreパッケージに移るためには以下の基準を考慮します。

* It needs to be **used**. The Material-UI team uses Google Analytics stats among other metrics to evaluate the usage of each component. A lab component with low usage either means that it isn't fully working yet or that there is a low demand for it.
* It needs to match the **code quality** of the core components. It doesn't have to be perfect to be a part of the core, but the component should be reliable enough that developers can depend on it. 
    * Each component needs **type definitions**. It is not currently required that a lab component is typed, but it would need to be typed to move to the core.
    * Requires good **test coverage**. Some of the lab components don't currently have comprehensive tests.
* Can it be used as **leverage** to incentivize users to upgrade to the latest major release? The less fragmented the community is, the better.
* It needs to have a low probability of a **breaking change** in the short/medium future. For instance, if it needs a new feature that will likely require a breaking change, it may be preferable to delay its promotion to the core.

## インストール

Install the package in your project directory with:

```sh
// with npm
npm install @material-ui/lab

// with yarn
yarn add @material-ui/lab
```

The lab has a peer dependency on the core components. If you are not already using Material-UI in your project, you can install it with:

```sh
// npmの場合
npm install @material-ui/core

// yarnの場合
yarn add @material-ui/core
```