const redis = require("redis");
var redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

module.exports = {
    saveRedis: async function (data) {
        const value = JSON.stringify(data);
        await redisClient.set(data.roomid, value);
        console.log("save to redis")
    },

    getRedis: async function (data) {
        const sessionData = JSON.parse(
            await redisClient.get(data.roomid)
        );
        console.log("retrive from redis")
        return sessionData;
    }
}
