const md5 = require("md5");
const { generateid } = require("../services/generateid");
const { saveRedis, getRedis, saveAllRoomID } = require("../services/redis.utils");
const { updateOfflineStatus } = require("../services/helper");


class ChatRoom {

    static initChatRoom(socket, io) {
        // console.log(`User  ${socket.id}`);
        socket.on("create-room", async ({ }) => {

            const chatRoomModel = {
                roomid: md5(generateid(100000, 999999) + "usernamelingb"),
                users: [],
                get activeusers() {
                    return {
                        count: this.users.length,
                    };
                }
            };

            // let user = {
            //     socketID: socket.id,
            //     userName: username,
            //     language: language,
            //     status: "online",
            //     messages: []
            // };

            // chatRoomModel.users.push(user);
            await saveRedis(chatRoomModel);
            const roomids = await getRedis("roomids") ?? [];
            roomids.push(chatRoomModel.roomid);
            await saveAllRoomID(roomids);
            //const chatroom = await getRedis(chatRoomModel.roomid);

            socket.join(chatRoomModel.roomid);
            io.to(chatRoomModel.roomid).emit("room-msg", chatRoomModel);


        })

        socket.on("join-room", async ({ username, language, roomid }) => {
            let chatroom = await getRedis(roomid);
            if (!chatroom) {
                socket.emit(
                    "join-room-error",
                    "Chatroom id is invalid"
                );
                return
            }
            console.log(chatroom)

            let user = {
                socketID: socket.id,
                userName: username,
                language: language,
                status: "online",
                messages: []
            };
            chatroom.users.push(user);
            chatroom.activeusers.count = chatroom.users.length
            await saveRedis(chatroom);
            console.log(chatroom);
        }

        )

        socket.on("disconnect", () => {
            // When a user disconnects
            console.log(`User disconnected from room: ${socket.id}`);
            updateOfflineStatus(socket.id);
            //  delete onlineUsers[socket.id];
        });

    }

}
module.exports = ChatRoom