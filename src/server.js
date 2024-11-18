import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_,res) => res.redirect("/"));

const handleListen = () => console.log('Listening on 4000');
const server = http.createServer(app);

// WebSocket 대신 Socket.IO 서버 생성
const io = new Server(server);

io.on("connection", (socket) => {
    socket.emit("hello", "hi from server🙌");
    
    socket.on("new_message", (msg) => {
        // 메시지를 보낸 클라이언트를 제외한 모든 클라이언트에게 브로드캐스트
        socket.broadcast.emit("new_message", msg);
    });

    socket.on("disconnect", () => {
        console.log("somebody left");
    });
});

server.listen(4000, handleListen);
