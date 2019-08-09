import * as express from "express";
import {Server as SocketServer} from "socket.io";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 3000);

app.set('views', './client');
app.set('view engine', 'pug');

let http = require("http").Server(app);

let io: SocketServer = require("socket.io")(http);
io.origins('*:*');

// simple '/' endpoint sending a Hello World
// response
app.get("/", (req: any, res: any) => {
    res.render('index');
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function (socket: any) {

    console.log("a user connected");

    socket.on("message", function (message: any) {

        console.log(message);

        socket.emit("message", message);
    });
});

// start our simple server up on localhost:3000
const server = http.listen(function () {
    console.log("listening on " + app.get('port'));
});
