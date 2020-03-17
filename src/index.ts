const removeHash = (color: string) => {
  if (typeof color !== "string") {
    throw new TypeError("Color parameter must be a string");
  }

  return color.replace(/#/g, "");
};

// const isValidHexadecimal = (color: string) => {
//   if (typeof color !== "string") {
//     throw new TypeError("Color parameter must be a string");
//   }

//   color = removeHash(color);

//   return /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(color);
// };

const expandHexadecimal = (color: string) => {
  if (typeof color !== "string") {
    throw new TypeError("Color parameter must be a string");
  }
  color = removeHash(color);

  // TODO: Fail if invalid
  // const valid = isValidHexadecimal(color);

  const [red, blue, green] = color.split("");
  return [red, red, blue, blue, green, green].join("");
};

const parseHexadecimal = (color: string) => {
  if (typeof color !== "string") {
    throw new TypeError("Color parameter must be a string");
  }

  color = removeHash(color);

  if (color.length === 3) {
    color = expandHexadecimal(color);
  }

  // TODO: Fail if not 6 characters long
  // if (color.length !== 6) {

  // }

  return /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
};

const convertHexadecimalToHSL = (color: string) => {
  color = removeHash(color);
  const hex = parseHexadecimal(color);

  if (!hex) {
    return;
  }

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

  // TODO: fail if invalid
  // const valid = isValidHexadecimal(color);

  const lightness = convertHexadecimalToHSL(color)[2];

  return lightness > threshold ? "dark" : "light";
};

export default foreground;
