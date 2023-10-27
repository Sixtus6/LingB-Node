const { getRedis, saveRedis } = require("./redis.utils");




module.exports = {
    updateOfflineStatus: async function (socketID) {
        try {
            const allrooms = await getRedis("roomids");
            if (allrooms) {
                for (let index = 0; index < allrooms.length; index++) {
                    const element = allrooms[index];
                    let chatroom = await getRedis(element);
                    const user = chatroom.users.find((u) => u.socketID === socketID);
                    if (user) {
                        user.status = 'offline';
                        await saveRedis(chatroom);
                    }
                    // console.log(user, chatroom, index);
                }


            }
        } catch (error) {
            console.log(error)
        }
    }
}