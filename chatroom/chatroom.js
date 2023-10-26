const md5 = require("md5");
const { generateid } = require("../services/generateid");


class ChatRoom{

    static initChatRoom(socket, io) {
       // console.log(`User  ${socket.id}`);
        socket.on("create-room", async ({ username, language }) => {
            var id = generateid(100000, 999999);

            const chatRoomModel = {
                chatid: md5(id + username),
                users: [],
            };
            let user = {
                socketID: socket.id,
                userName: username,
                language: language,
                messages: []
            };
            chatRoomModel.users.push(user);
            
            console.log(chatRoomModel)
            console.log(username, language, id);

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