# Поддерживаемые платформы

<p class="description">Узнайте о платформах, от современных до старых, которые поддерживаются Material-UI.</p>

## Браузер

Material-UI поддерживает все последние, стабильные релизы основых браузеров и платформ. It also supports Internet Explorer 11. You don't need to provide any JavaScript polyfill as it manages unsupported browser features internally and in isolation.

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |


Because Googlebot uses a web rendering service (WRS) to index the page content, it's critical that Material-UI supports it. [WRS regularly updates the rendering engine it uses](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). You can expect Material-UI's components to render without major issues.

## Server

Because Material-UI supports server-side rendering, it needs to support the latest, stable releases of [Node.js](https://github.com/nodejs/node). Where possible, the [LTS versions that are in maintenance](https://github.com/nodejs/Release#lts-schedule1) are supported. Right now, it supports **node v8.x** and newer versions.

### CSS prefixing

Be aware that some CSS features [require](https://github.com/cssinjs/jss/issues/279) an additional postprocessing step that adds vendor specific prefixes. These prefixes are automatically added on the client thanks to [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

The CSS served on this documentation is processed with [`autoprefixer`](https://www.npmjs.com/package/autoprefixer). You can use [the documentation implementation](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) as inspiration. Be aware that it has an implication with the performance of the page. It's a must do for static pages, but it needs to be put in balance with not doing anything when rendering dynamic pages.

## React

Material-UI supports the most recent versions of React, starting with ^16.8.0 (the one with the hooks). Have a look at the older [versions](/versions/) for backward compatibility.