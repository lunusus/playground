import fs from "node:fs";
import Block from "./../module/block.js";

const dataPath = "./data";
let blocks = [];

for (let i = 0; i < 50; i++) {
  blocks.push(Block.create());
}

try {
  fs.writeFileSync(dataPath + "/blocks.json", JSON.stringify(blocks));
  console.info("ok");
} catch (err) {
  console.error(err);
}
