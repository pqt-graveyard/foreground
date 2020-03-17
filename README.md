<h1 align="center">
  @pqt/foreground
</h1>

<h3 align="center">
Determine whether a given background color will need a light or dark foreground
</h3>

## Installation

```
npm install @pqt/foreground
# OR
yarn add @pqt/foreground
```

## Usage

```js
import { foreground } from "@pqt/foreground";

foreground("fff")     // => returns "dark"
foreground("000")     // => returns "light"
foreground("005cc5")  // => returns "light"

## License

MIT
```
