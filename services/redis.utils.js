const redis = require("redis");
var redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

module.exports = {
    saveRedis: async function (key, data) {
        const value = JSON.stringify(gameModel);
        await redisClient.set(gameModel.gameid, value);
    }
}
