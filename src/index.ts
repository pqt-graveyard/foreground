const removeHash = (color: string) => {
  return color.replace(/#/g, "");
};

const expandHexadecimal = (color: string) => {
  const colorWithoutHash = removeHash(color);
  const valid = isValidHexadecimal(colorWithoutHash);

  if (valid && colorWithoutHash.length === 3) {
    const [red, blue, green] = colorWithoutHash.split("");
    return [red, red, blue, blue, green, green].join("");
  } else {
    throw "Invalid Hexidecimal Shorthand Length";
  }
};

const parseHexadecimal = (color: string) => {
  let colorWithoutHash = removeHash(color);

  if (colorWithoutHash.length === 3) {
    colorWithoutHash = expandHexadecimal(colorWithoutHash);
  }

  if (colorWithoutHash.length === 6) {
    return /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorWithoutHash);
  } else {
    throw "Failed to Parse Hexidecimal value into a RegExpExecArray type";
  }
};

const isValidHexadecimal = (color: string) => {
  const colorWithoutHash = removeHash(color);
  const valid = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(colorWithoutHash);

  if (valid) {
    return true;
  } else {
    return false;
  }
};

const convertHexadecimalToHSL = (color: string) => {
  const colorWithoutHash = removeHash(color);
  const hex = parseHexadecimal(colorWithoutHash)!;

  const [red, green, blue] = [
    parseInt(hex[1], 16) / 255,
    parseInt(hex[2], 16) / 255,
    parseInt(hex[3], 16) / 255
  ];

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  let hue = 0;
  let saturation = 0;
  let lightness = (max + min) / 2;

  if (max === min) {
    hue = saturation = 0;
  } else {
    const difference = max - min;
    saturation =
      lightness > 0.5 ? difference / (2 - max - min) : difference / (max + min);

    switch (max) {
      case red:
        hue = (green - blue) / difference + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / difference + 2;
        break;
      case blue:
        hue = (red - green) / difference + 4;
        break;
    }
    hue /= 6;
  }

  hue = Math.round(hue * 360);
  saturation = Math.round(saturation * 100);
  lightness = Math.round(lightness * 100);

  return [hue, saturation, lightness];
};

export const foreground = (color: string, threshold = 65) => {
  if (typeof color !== "string") {
    throw new TypeError("Color parameter must be a string");
  }
  if (typeof threshold !== "number") {
    throw new TypeError("Threshold parameter must be a number");
  }

  color = removeHash(color);

  const valid = isValidHexadecimal(color);

  if (valid) {
    const lightness = convertHexadecimalToHSL(color)[2];

    return lightness > threshold ? "dark" : "light";
  }
};

export default foreground;
