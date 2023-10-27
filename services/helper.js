const { getRedis } = require("./redis.utils");




module.exports = {
    updateOfflineStatus: async function () {
        try {
            const allrooms = await getRedis("roomids");
            if (allrooms) {
                console.log("get")
            }
        } catch (error) {
            console.log(error)
        }
    }
}