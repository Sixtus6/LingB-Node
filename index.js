const AppSocket = require("./socket/socket");
const config = require("./config/env.config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Expose-Headers", "Content-Length");
    res.header(
      "Access-Control-Allow-Headers",
      "Accept, Authorization, Content-Type, X-Requested-With, Range"
    );
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    } else {
      return next();
    }
  });


AppSocket.initSocket(app, (server) => {
    server.listen(config.port, () => {
      console.log("app listening at port %s", config.port);
    });
  });
  