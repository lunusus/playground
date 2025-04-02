import Sort from "../module/sort.js";

class Map {
  constructor(blocks = [], baseCoordinates = []) {
    this.blocks = blocks;
    this.baseCoordinates = baseCoordinates;
  }

  check() {
    if (!this.blocks.length) {
      throw new Error("blocks array cannot be empty");
    }
    if (!this.baseCoordinates.length) {
      throw new Error("baseCoordinates array cannot be empty");
    }
  }

  /**
   * Set blocks by chain
   */
  placeBlocksByChain() {
    if (this.blocks.length != this.baseCoordinates.length) {
      throw new Error("blocks and baseCoordinates should have same length");
    }
    this.blocks = this.blocks.map((block, index) => ({
      ...block,
      position: this.baseCoordinates[index],
    }));
  }

  /**
   * Set blocks grouped by colors into columns
   */
  placeBlocksGroupedByColors() {
    Sort.sortByColor(this.blocks);

    const stepSize = 20;
    let top = 0,
      step = 1,
      index = 0;
    let coord = this.baseCoordinates[index];

    for (const block of this.blocks) {
      if (block.convertedColor.hue < stepSize * step) {
        coord.y = top;
      } else {
        step++;
        top = 0;
        coord = this.baseCoordinates[index];
        index++;
      }
      top += block.scale.y;
      block.position.x = coord.x;
      block.position.y = coord.y;
      block.position.z = coord.z;
    }
  }

  getData() {
    return {
      blocks: this.blocks,
      baseCoordinates: this.baseCoordinates,
    };
  }
}

export default Map;
