const http = require("http");
const redis = require("redis");
var redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});
var isconnected = false;
class Socket {

    constructor() {
        this.init = false;
        if (!isconnected) {

            (async () => {
                await redisClient.connect();
            })();
            isconnected = true;
            console.log(`connected successfully to Redis`);
        } else { }
    }

    initSocket(app, callback) {
        this.app = app;
        this.server = http.createServer(this.app);
        this.io = require("socket.io")(this.server);
        this.init = true;
        this.io.on("connection", (socket) => {
            const onlineUsers = {};
            this.socket = socket;
            console.log(`User connected: ${socket.id}`);
            // TicTacToe.gamefunction(this.socket, this.io);
            // Dice.gamefunction(this.socket, this.io);
            // Chess.gamefunction(this.socket, this.io);
            // Scrabble.gamefunction(this.socket, this.io);
            // Ludo.gamefuntion(this.socket, this.io);
            // Snooker.gamefuntion(this.socket, this.io);
            socket.on("disconnect", () => {
                // When a user disconnects
                console.log(`User disconnected: ${socket.id}`);
              //  delete onlineUsers[socket.id];
              });
        });
        callback(this.server);
    }
}

const AppSocket = new Socket();

module.exports = AppSocket;
