const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { PORT } = require("./config/config");
const mongoConnect = require("./config/mongodbConnect");

const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const { Room } = require('./models/room-model')

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});


io.on("connection", (socket) => {

    socket.on("join-room", async ({ roomid }) => {

        socket.join(roomid);

        const room = await Room.findById(roomid)
            .populate("members", "username");

        io.to(roomid).emit("room-users", room.members);

        console.log(
            `${socket.id} joined room ${roomid}`
        );

    });


    socket.on("code-change", ({ roomid, code }) => {
        socket
            .to(roomid)
            .emit("code-update", code);

    });

    socket.on("leave-room", async (roomid) => {
      
            socket.leave(roomid);

            const room = await Room.findById(roomid)
                .populate("members", "username");

            if (!room) return;

            io.to(roomid).emit("room-users", room.members);

            console.log(`${socket.id} left room ${roomid}`);

        });

});

mongoConnect();

app.use("/user", userRoutes);
app.use("/room", roomRoutes);

server.listen(PORT, () => {

    console.log(
        `Server started on http://localhost:${PORT}`
    );

});