import Sort from "../module/sort.js";

class Map {
  constructor(blocks, baseCoordinates) {
    this._blocks = blocks;
    this._baseCoordinates = baseCoordinates;
  }

  check() {
    if (!this._blocks.length) {
      throw new Error("blocks array cannot be empty");
    }
    if (!this._baseCoordinates.length) {
      throw new Error("baseCoordinates array cannot be empty");
    }
  }

  getBlocks() {
    return this._blocks;
  }

  /**
   * Set blocks by chain
   */
  setBlocksByChain() {
    if (this._blocks.length != this._baseCoordinates.length) {
      throw new Error("blocks and baseCoordinates should have same length");
    }
    this._blocks = this._blocks.map((block, index) => ({
      ...block,
      position: this._baseCoordinates[index],
    }));
  }

  /**
   * Set blocks grouped by colors into columns
   */
  setBlocksGroupedByColors() {
    Sort.sortByColor(this._blocks);

    const stepSize = 20;
    let top = 0,
      step = 1,
      index = 0;
    let coord = this._baseCoordinates[index];

    for (const block of this._blocks) {
      if (block.convertedColor.hue < stepSize * step) {
        coord.y = top;
      } else {
        step++;
        top = 0;
        coord = this._baseCoordinates[index];
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
      blocks: this.getBlocks(),
      baseCoordinates: this._baseCoordinates,
    };
  }
}

export default Map;
