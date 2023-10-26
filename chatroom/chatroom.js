const md5 = require("md5");


class ChatRoom{

    static initChatRoom(socket, io) {

        socket.on("create-room", async ({ username, language }) => {
            console.log(username, language)
         })

    }

}
module.exports = ChatRoom