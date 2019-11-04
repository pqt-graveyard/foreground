export const removeHash = (color: string) => {
  return color.replace(/#/g, "");
};

export const expandHexadecimal = (color: string) => {
  const colorWithoutHash = removeHash(color);
  const valid = isValidHexadecimal(colorWithoutHash);

  if (!valid) {
    throw "Invalid Hexidecimal";
  }

  if (colorWithoutHash.length !== 3) {
    throw "Invalid Hexidecimal Shorthand Length";
  }

  const [red, blue, green] = colorWithoutHash.split("");
  return [red, red, blue, blue, green, green].join("");
};

export const parseHexadecimal = (color: string) => {
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

export const isValidHexadecimal = (color: string) => {
  const colorWithoutHash = removeHash(color);
  const valid = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(colorWithoutHash);

  if (valid) {
    return true;
  } else {
    return false;
  }
};

export const convertHexadecimalToHSL = (color: string) => {
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

export const foreground = (color: string, threshold = 75) => {
  const colorWithoutHash = removeHash(color);
  const valid = isValidHexadecimal(colorWithoutHash);

  if (valid) {
    const [_, __, lightness] = convertHexadecimalToHSL(colorWithoutHash);

    return {
      color: lightness > threshold ? "000000" : "ffffff",
      type: lightness > threshold ? "dark" : "light"
    };
  } else {
    throw "Could not determine how to colorize the foreground.";
  }
};
