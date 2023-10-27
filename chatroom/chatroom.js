const md5 = require("md5");
const { generateid } = require("../services/generateid");
const { saveRedis, getRedis, saveAllRoomID } = require("../services/redis.utils");


class ChatRoom {

    static initChatRoom(socket, io) {
        // console.log(`User  ${socket.id}`);
        socket.on("create-room", async ({ username, language }) => {

            const chatRoomModel = {
                roomid: md5(generateid(100000, 999999) + username),
                users: [],
                get activeusers() {
                    return {
                        count: this.users.length,
                    };
                }
            };
            let user = {
                socketID: socket.id,
                userName: username,
                language: language,
                status: "online",
                messages: []
            };
            chatRoomModel.users.push(user);
            await saveRedis(chatRoomModel);
            const roomids = [];
            roomids.push(chatRoomModel.roomid);
            await saveAllRoomID()
            const chatroom = await getRedis(chatRoomModel.roomid);



        })


        socket.on("disconnect", () => {
            // When a user disconnects
            console.log(`User disconnected from room: ${socket.id}`);
            //  delete onlineUsers[socket.id];
        });

    }

}
module.exports = ChatRoom