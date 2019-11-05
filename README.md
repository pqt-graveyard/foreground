<h1 align="center">
  Foreground
</h1>

<h3 align="center">
  🎨 📦 💄
</h3>
<h3 align="center">
  Focus on the background, I'll do the foreground.
</h3>
<p align="center">
  Validate a hexadecimal value, Convert hexadecimal to HSL, determine if the colour needs a light or dark foreground.
</p>

<p align="center">
  <a href="https://github.com/pqt/foreground/actions?workflow=status">
    <img src="https://github.com/pqt/foreground/workflows/status/badge.svg" alt="Current Github Action build status." />
  </a>
  <a href="https://www.npmjs.org/package/@pqt/foreground">
    <img src="https://img.shields.io/npm/v/@pqt/foreground.svg" alt="Current npm package version." />
  </a>
  <a href="https://github.com/pqt/foreground/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="@pqt/foreground is released under the MIT license." />
  </a>
</p>

## Getting Started

```bash
npm i @pqt/foreground --save
# OR
yarn add @pqt/foreground
```

## Usage

```js
import { foreground } from "@pqt/foreground";

// could be "fff" | "#fff" | "ffffff" | "#ffffff"
const backgroundColor = "#fff";

// value becomes: { color: "000000", type: "dark" }
const foregroundColor = foreground(backgroundColor);
```

## Functions

| function                | parameter: type                  | returns         |
| ----------------------- | -------------------------------- | --------------- |
| removeHash              | color: string                    | string          |
| expandHexadecimal       | color: string                    | string          |
| parseHexadecimal        | color: string                    | RegExpExecArray |
| isValidHexadecimal      | color: string                    | boolean         |
| convertHexadecimalToHSL | color: string                    | number[]        |
| foreground              | color: string, threshold: number | object          |

## Parameters Insight

The `color` parameter should be a valid hexidecimal code, either with or without the hash. All functions remove the hash immediately and any hexidecimal values returned will be without it. So be conscious of that.

The `threshold` parameter in the `foreground` function starts at 75. This is the "lightness" of the passed color (in HSL format). If the lightness of the color is **greater than** the threshold, a dark color suggestion will be made. If the lightness is **equal to or less than** the allowed threshold a light color suggestion will be returned instead.

## Validations and Errors

When using any of the functions, the hexidecimal value is validated and stripped of the hash (#). The validation process accepts most accepted forms for a color hex code. This includes both shorthand and full length.

Validation is **case-insensitive**.

**Validation Passing Formats**

```
fff
#fff
ffffff
#ffffff
```

Validation of new-era hexidecimal is not _yet_ supported or on the roadmap since it is very seldom used. If you'd like to see it though feel free to post an issue and I'll revisit this opinion there.

## License

MIT
