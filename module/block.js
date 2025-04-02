import Color from "../module/color.js";

const Block = (function () {
  function create() {
    const height = Math.random() * 5 + 1;
    let block = {
      color: Color.getRandomHexColor(),
      scale: {
        x: 1,
        y: height,
        z: 1,
      },
      position: { x: 0, y: 0, z: 0 },
    };
    return block;
  }

  return {
    create,
  };
})();

export default Block;
