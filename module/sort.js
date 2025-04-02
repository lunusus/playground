import { convert as convertColor, compare as compareColor } from "color-sorter";
import Color from "../module/color.js";

const Sort = (function () {
  function sortByHeight(blocks) {
    blocks.sort((a, b) => b.scale.y - a.scale.y);
  }

  function sortByColor(blocks) {
    for (const block of blocks) {
      block.convertedColor = convertColor(
        "#" + Color.convertDecimalToHex(block.color),
      );
    }
    blocks.sort((a, b) => compareColor(a.convertedColor, b.convertedColor));
  }

  return {
    sortByHeight,
    sortByColor,
  };
})();

export default Sort;
