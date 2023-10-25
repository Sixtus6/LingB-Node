const http = require("http");
const Snooker = require("./snooker.js/index.js");
const Chess = require("./chess");
const Dice = require("./dice");
const Ludo = require("./ludo");
const Scrabble = require("./scrabble");

const TicTacToe = require("./tic_tac_toe");

class Socket {

    constructor() {
        this.init = false;
    }

    initSocket(app, callback) {

        this.app = app;

        this.server = http.createServer(this.app);

        this.io = require("socket.io")(this.server);

        this.init = true;

        this.io.on("connection", (socket) => {
            this.socket = socket;
            TicTacToe.gamefunction(this.socket, this.io);
            Dice.gamefunction(this.socket, this.io);
            Chess.gamefunction(this.socket, this.io);
            Scrabble.gamefunction(this.socket, this.io);
            Ludo.gamefuntion(this.socket, this.io);
            Snooker.gamefuntion(this.socket, this.io);
        });

        callback(this.server);
    }
}

const AppSocket = new Socket();

module.exports = AppSocket;
