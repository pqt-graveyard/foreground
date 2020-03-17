<h1 align="center">
  foreground
</h1>

<h3 align="center">
Determine whether a given background color will need a light or dark foreground
</h3>

<p align="center">
  <a href="https://www.npmjs.org/package/@pqt/foreground">
    <img src="https://img.shields.io/npm/v/@pqt/foreground.svg" alt="Current npm package version." />
  </a>
  <a href="https://github.com/pqt/foreground/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Released under the MIT license." />
  </a>
  <a href="https://github.com/pqt/foreground/actions?workflow=status">
    <img src="https://github.com/pqt/foreground/workflows/status/badge.svg" alt="Current Github Action build status." />
  </a>
  <a href="https://npmcharts.com/compare/@pqt/foreground?minimal=true">
    <img src="https://img.shields.io/npm/dm/@pqt/foreground.svg" alt="Downloads per month on npm." />
  </a>
  <a href="https://npmcharts.com/compare/@pqt/foreground?minimal=true">
    <img src="https://img.shields.io/npm/dt/@pqt/foreground.svg" alt="Total downloads on npm." />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=pqtdev">
    <img src="https://img.shields.io/twitter/follow/pqtdev.svg?label=Follow%20@pqtdev" alt="Follow @pqtdev" />
  </a>
</p>

## Installation

```
npm install @pqt/foreground
# OR
yarn add @pqt/foreground
```

## Usage

```js
import { foreground } from "@pqt/foreground";

foreground("fff"); // => returns "dark"
foreground("000"); // => returns "light"
foreground("005cc5"); // => returns "light"
```

## License

MIT
