const Color = (function () {
  // Generate a random number between 0 and 0xFFFFFF (16777215 in decimal)
  function getRandomHexColor() {
    return Math.floor(Math.random() * 0xffffff);
  }

  // Convert to hex and pad with zeros
  function convertDecimalToHex(color) {
    return color.toString(16).padStart(6, "0");
  }

  return {
    getRandomHexColor,
    convertDecimalToHex,
  };
})();

export default Color;
