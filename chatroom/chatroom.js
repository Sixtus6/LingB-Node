const md5 = require("md5");


class ChatRoom{

    static initChatRoom(socket, io) {
       // console.log(`User  ${socket.id}`);
        socket.on("create-room", async ({ username, language }) => {
            
            console.log(username, language)
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