const md5 = require("md5");
const { generateid } = require("../services/generateid");
const { saveRedis, getRedis, saveAllRoomID } = require("../services/redis.utils");
const { updateOfflineStatus } = require("../services/helper");
const { translator } = require("../services/translator");


class ChatRoom {

    static initChatRoom(socket, io) {
        // console.log(`User  ${socket.id}`);

        /* ------------------------------ create-rooom ------------------------------ */
        socket.on("create-room", async ({ }) => {

            const chatRoomModel = {
                roomid: md5(generateid(100000, 999999) + "usernamelingb"),
                users: [],
                get activeusers() {
                    return {
                        count: this.users.length,
                    };
                },
                messages: []
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
            io.to(chatRoomModel.roomid).emit("create-room-msg", chatRoomModel);


        })

        /* -------------------------------- join room ------------------------------- */
        socket.on("join-room", async ({ username, roomid }) => {
            let chatroom = await getRedis(roomid);
            if (!chatroom) {
                socket.emit(
                    "join-room-error",
                    "chat-room id is invalid"
                );
                return
            }
            const usernameExist = chatroom.users.find((u) => u.userName === username);
            if (usernameExist) {
                socket.emit(
                    "join-room-error",
                    "username taken by another user"
                );
                return
            }
            let user = {
                socketID: socket.id,
                userName: username,
                language: { en: "english", yo: "yoruba", ig: "igbo", ha: "hausa" },
                status: "online",
                messages: []
            };

            chatroom.users.push(user);
            chatroom.activeusers.count = chatroom.users.length
            await saveRedis(chatroom);

            socket.join(chatroom.roomid);
            io.to(chatroom.roomid).emit("join-room-msg", chatroom.users);
            console.log(chatroom)
        })

        /* ---------------------------chat-room----- chat room ------------------------------- */
        socket.on("chat-room", async ({ roomid, message, socketid }) => {
            let chatroom = await getRedis(roomid);
            if (!chatroom) {
                socket.emit(
                    "chat-room-error",
                    "chat-room id is invalid"
                );
                return
            }
            const user = chatroom.users.find((u) => u.socketID === socketid);
            if (!user) {
                socket.emit(
                    "chat-room-error",
                    "socket id is invalid"
                );
                return
            }
            // yo,  ig, ha
            let mssg = {
                username: user.userName,
                socketID: user.socketID,
                eng: await translator(message, "en"),
                local: message,
                igbo: await translator(message, "ig"),
                hausa: await translator(message, "ha"),
                yoruba: await translator(message, "yo"),

            }
            //  user.messages.push(mssg);
            chatroom.messages.push(mssg)
            console.log(user)
            await saveRedis(chatroom);
            socket.join(chatroom.roomid);
            io.to(chatroom.roomid).emit("chat-room-msg", chatroom);
        })



        socket.on("disconnect", () => {
            // When a user disconnects
            console.log(`User disconnected from room: ${socket.id}`);
            updateOfflineStatus(socket.id);
            //  delete onlineUsers[socket.id];
        });

    }

}
module.exports = ChatRoom