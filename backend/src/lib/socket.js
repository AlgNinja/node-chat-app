import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)

const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173"
const io = new Server(server, {
    cors: { 
        origin: [allowedOrigin] 
    },
    // Force aggressive heartbeats to prevent Render's idle timeout
    pingTimeout: 60000,
    pingInterval: 25000
})

const userSocketMap = {}

function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId
    
    // Ensure userId is valid before mapping
    if(userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        if(userId && userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId]
            io.emit("getOnlineUsers", Object.keys(userSocketMap))
        }
    })
})

export { app, server, io, getReceiverSocketId }