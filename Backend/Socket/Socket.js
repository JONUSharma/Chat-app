const { Server } = require("socket.io")
const express = require("express")
const app = express();
const http = require("http");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

const userSocketMap = {
    // userId : socketId,
}

io.on("connection", (socket) => {
    const userID = socket.handshake.query.userID;
    if (!userID) return

    userSocketMap[userID] = socket.id;

    io.emit("onlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        delete userSocketMap[userID];
        io.emit("onlineUsers", Object.keys(userSocketMap));
    });


})
const getSocketId = (userId) => {
    return userSocketMap[userId];
}
module.exports = {
   io, app, server,getSocketId
}