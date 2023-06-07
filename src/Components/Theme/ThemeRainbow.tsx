var style = getComputedStyle(document.body);
const primaryColor = style.getPropertyValue("--primary-color");
//const secondaryColor = style.getPropertyValue("--secondary-color");

export const themeRainbow = {
  rainbow: {
    palette: {
      brand: primaryColor,
    },
  },
};
