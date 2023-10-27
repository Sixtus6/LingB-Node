const redis = require("redis");
var redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});
var isconnected = false;

module.exports = {
    saveRedis: async function (data) {
        try {
            if (!isconnected) {
                (async () => {
                    await redisClient.connect();
                })();
                isconnected = true;
                console.log(`connected successfully to Redis`);
            } else { }
            const value = JSON.stringify(data);
            await redisClient.set(data.roomid, value);
            console.log("save to redis")
        } catch (error) {
            console.log(error)
        }
    },

    saveAllRoomID: async function (data) {
        try {
            if (!isconnected) {
                (async () => {
                    await redisClient.connect();
                })();
                isconnected = true;
                console.log(`connected successfully to Redis`);
            } else { }
            const value = JSON.stringify(data);
            await redisClient.set("roomids", value);
            console.log("save ids to redis")
        } catch (error) {
            console.log(error)
        }
    },

    getRedis: async function (key) {
        if (!isconnected) {
            (async () => {
                await redisClient.connect();
            })();
            isconnected = true;
            console.log(`connected successfully to Redis`);
        } else { }
        const sessionData = JSON.parse(
            await redisClient.get(key)
        );
        console.log("retrive from redis")
        return sessionData;
    }
}
