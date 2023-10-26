module.exports = {
    generateid: function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        Math.floor(Math.random() * (max - min) + min);
    }
}