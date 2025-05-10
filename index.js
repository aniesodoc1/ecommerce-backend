const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

  app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(cookieParser());
app.use("/api", router);

const PORT = process.env.PORT || 4444;

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log(`Server running on port ${PORT}`);
  });

  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL, 
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  let onlineUsers = [];

  const addUser = (userId, socketId) => {
    const userExists = onlineUsers.find((user) => user.userId === userId);
    if (!userExists) {
      onlineUsers.push({ userId, socketId });
      console.log("Current online users:", onlineUsers);
    }
  };

  const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("newUser", (userId) => {
      addUser(userId, socket.id);
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
      const receiver = getUser(receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit("getMessage", data);
      } else {
        console.log(`User with ID ${receiverId} is not online.`);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      removeUser(socket.id);
    });
  });
});
