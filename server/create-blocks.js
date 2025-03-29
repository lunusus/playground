const fs = require('node:fs');
const rootPath = __dirname + '/..';
const block = require(rootPath + '/lib/block-maker');

const dataPath = rootPath + '/data';
let blocks = [];

for (let i = 0; i < 50; i++) {
    blocks.push(block.default.create());
}

try {
    fs.writeFileSync(dataPath + '/blocks.json', JSON.stringify(blocks));
    console.info('ok');
} catch (err) {
    console.error(err);
}
