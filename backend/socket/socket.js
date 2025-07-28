import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../models/user.model.js";

let io;
const userSocketMap = {};

export const initSocketIO = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5001",
            credentials: true,
        },
    });

    io.use(async (socket, next) => {
        try {
            const cookies = socket.handshake.headers.cookie;
            if (!cookies) {
                return next(new Error("Authentication error: No cookies found"));
            }
            const token = cookie.parse(cookies).jwt;

            if (!token) {
                return next(new Error("Authentication error: No token found"));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                return next(new Error("Authentication error: Invalid token"));
            }

            socket.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (error) {
            console.log("Socket authentication error:", error.message);
            return next(new Error("Authentication error"));
        }
    });

    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);
        const userId = socket.handshake.query.userId;

        if (userId !== "undefined") {
            userSocketMap[userId] = socket.id;
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
};

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

export { io };