import fs from "node:fs";
import Coordinates from "./../module/coordinates.js";
import Block from "../module/block.js";
import Map from "../module/map.js";
// import Sort from "../module/sort.js";
import api from "../module/api.js";

const dataPath = "./data";
let blocks = [],
  coords = [];
const map = new Map(blocks, coords);

setInterval(fetchData, 5000);
fetchData();

async function fetchData() {
  try {
    const response = await api.get("/blocks");
    blocks = response.data;
    createMap();
  } catch (error) {
    console.error("API Error:", error);
  }
}

function createMap() {
  blocks = coords = [];
  for (let i = 0; i < 50; i++) {
    blocks.push(Block.create());
  }
  // Sort.sortByHeight(blocks);

  // coords = Coordinates.getSquareSpiral(blocks.length, 2);
  coords = Coordinates.getArchimedeanSpiral(blocks.length);

  map.blocks = blocks;
  map.baseCoordinates = coords;

  map.placeBlocksGroupedByColors();

  try {
    fs.writeFileSync(`${dataPath}/map.json`, JSON.stringify(map.getData()));
    console.info("ok");
  } catch (err) {
    console.error(err);
  }
}
