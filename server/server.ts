import * as express from "express";
import {Server as SocketServer} from "socket.io";
import {Http2Server} from "http2";
import {Request, Response} from "express";


let port: number = Number.parseInt(process.env.PORT) || 3000;

const app = express();
app.set("port", port);
console.info('Prepared to listen on port ' + port);

app.set('views', './client');
app.set('view engine', 'pug');

const httpServer: Http2Server = require("http").Server(app);

let io: SocketServer = require("socket.io")(httpServer, {
    handlePreflightRequest: (req: Request, res: Response) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": '' + true
        };
        res.writeHead(200, headers);
        res.end();
    }
});
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
const server = httpServer.listen(port, function () {
    console.log("listening on " + port);
});
