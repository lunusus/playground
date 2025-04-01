import fs from "node:fs";
import { default as BlockMaker } from "./../module/block-maker.js";

const dataPath = "./data";
let blocks = [];

for (let i = 0; i < 50; i++) {
  blocks.push(BlockMaker.create());
}

try {
  fs.writeFileSync(dataPath + "/blocks.json", JSON.stringify(blocks));
  console.info("ok");
} catch (err) {
  console.error(err);
}
