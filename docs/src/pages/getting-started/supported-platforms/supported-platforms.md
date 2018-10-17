# Supported Platforms

<p class="description">Learn about the platforms, from modern to old, that are supported by Material-UI.</p>

## Browser

Material-UI supports the latest, stable releases of all major browsers and platforms.
We also support Internet Explorer 11.
You don't need to provide any JavaScript polyfill as we manage unsupported browser features internally and in isolation.

| IE    | Edge   | Firefox | Chrome | Safari | Googlebot |
|:------|:-------|:--------|:-------|:-------|:----------|
| 11    | >= 14  | >= 52   | >= 49  | >= 10  | ✅        |

Because Googlebot uses a web rendering service (WRS) to index the page content, it's critical that Material-UI supports it.
[WRS is based on Chrome 41](https://developers.google.com/search/docs/guides/rendering).
You can expect Material-UI's components to render without major issues.

## Server

Because Material-UI supports server side rendering, we need to support the latest, stable releases of [Node.js](https://github.com/nodejs/node).
We try to support the [last active LTS version](https://github.com/nodejs/Release#lts-schedule1). Right now, we support **node v6.x** and newer versions.
