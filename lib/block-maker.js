const BlockMaker = (function () {

    // Generate a random number between 0 and 0xFFFFFF (16777215 in decimal)
    function getRandomHexColor() {
        return Math.floor(Math.random() * 0xFFFFFF);
    }

    // Convert to hex and pad with zeros
    function convertColorToHex(color) {
        return color.toString(16).padStart(6, '0');
    }

    function create() {
        const height = Math.random() * 50 + 10;
        let block = {
            color: getRandomHexColor(),
            scale: {
                x: 10,
                y: height,
                z: 10,
            }
        }
        return block;
    }

    function sortByHeight(blocks) {
        blocks.sort((a, b) => b.scale.y - a.scale.y);
    }

    function sortByColor(blocks) {
        blocks.sort((a, b) => a.color - b.color);
    }

    return {
        create,
        convertColorToHex,
        sortByHeight,
        sortByColor
    };

})();

export default BlockMaker;
