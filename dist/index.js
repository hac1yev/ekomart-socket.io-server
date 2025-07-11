"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server({
    cors: {
        origin: ["https://ekomart.vercel.app", "http://localhost:3000"]
    }
});
let onlineUsers = [];
const addUser = ({ userId, socketId }) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
        onlineUsers.push({ userId, socketId });
    }
};
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
        addUser({ userId, socketId: socket.id });
    });
    socket.on("likeComment", ({ userId, fullName, type, message }) => {
        const reciever = getUser(userId);
        if (reciever)
            io.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit("sendUserLikeNotification", { userId, fullName, type, message });
    });
    socket.on("deleteTask", ({ notification, userIds }) => {
        userIds === null || userIds === void 0 ? void 0 : userIds.forEach((userId) => {
            const reciever = getUser(userId);
            if (reciever)
                io.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit("sendDeleteTaskNotification", notification);
        });
    });
    socket.on("editTask", ({ notification, userIds }) => {
        userIds === null || userIds === void 0 ? void 0 : userIds.forEach((userId) => {
            const reciever = getUser(userId);
            if (reciever)
                io.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit("sendEditTaskNotification", notification);
        });
    });
    socket.on("duplicateTask", ({ notification, userIds }) => {
        userIds === null || userIds === void 0 ? void 0 : userIds.forEach((userId) => {
            const reciever = getUser(userId);
            if (reciever)
                io.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit("sendDuplicateTaskNotification", notification);
        });
    });
    socket.on("addSubtask", ({ notification, userIds }) => {
        userIds === null || userIds === void 0 ? void 0 : userIds.forEach((userId) => {
            const reciever = getUser(userId);
            if (reciever)
                io.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit("sendAddSubTaskNotification", notification);
        });
    });
    socket.on("assignTask", ({ notification, userIds }) => {
        userIds === null || userIds === void 0 ? void 0 : userIds.forEach((userId) => {
            const reciever = getUser(userId);
            if (reciever)
                io.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit("sendUserAssignNotification", notification);
        });
    });
    socket.on("addUser", ({ notification, userIds }) => {
        userIds === null || userIds === void 0 ? void 0 : userIds.forEach((userId) => {
            const reciever = getUser(userId);
            if (reciever)
                io.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit("sendAddUserNotification", notification);
        });
    });
    socket.on("addComment", ({ notification, userIds }) => {
        userIds === null || userIds === void 0 ? void 0 : userIds.forEach((userId) => {
            const reciever = getUser(userId);
            if (reciever)
                io.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit("sendUserAddCommentNotification", notification);
        });
    });
    socket.on("addTimeline", ({ notification, userIds }) => {
        userIds === null || userIds === void 0 ? void 0 : userIds.forEach((userId) => {
            const reciever = getUser(userId);
            if (reciever)
                io.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit("sendAddTimelineNotification", notification);
        });
    });
    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
});
io.listen(parseInt(process.env.PORT || "4000", 10));
