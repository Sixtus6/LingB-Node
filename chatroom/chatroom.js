const md5 = require("md5");
const { generateid } = require("../services/generateid");
const { saveRedis } = require("../services/redis.utils");


class ChatRoom{

    static initChatRoom(socket, io) {
       // console.log(`User  ${socket.id}`);
        socket.on("create-room", async ({ username, language }) => {
           
            const chatRoomModel = {
                roomid: md5(generateid(100000, 999999) + username),
                users: [],
            };
            let user = {
                socketID: socket.id,
                userName: username,
                language: language,
                messages: []
            };
            chatRoomModel.users.push(user);
             await saveRedis()

            console.log(chatRoomModel)
            console.log(username, language,);

            console.log(`User connected created a room: ${socket.id}`);

        })
        
        socket.on("disconnect", () => {
            // When a user disconnects
            console.log(`User disconnected from room: ${socket.id}`);
          //  delete onlineUsers[socket.id];
          });

    }

}
module.exports = ChatRoom