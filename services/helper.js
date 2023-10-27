const { getRedis } = require("./redis.utils");




module.exports = {
    updateOfflineStatus: async function (socketID) {
        try {
            const allrooms = await getRedis("roomids");
            if (allrooms) {
                allrooms.forEach(async (element, index) => {
                    let chatroom = await getRedis(element);
                    const user = chatroom.users.find((u) => u.socketID === socketID);
                    console.log(chatroom.users.socketID)
                    if (chatroom.users.socketID == socketID) {

                        console.log(index)

                    }
                  
                    // let offlineUser = chatroom.users.find((u) => u.socketID === socketID);
                    // console.log(offlineUser);
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
}