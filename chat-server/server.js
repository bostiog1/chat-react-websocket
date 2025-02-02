const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

let users = {}; // Store users (socket.id -> name)
let messages = []; // Store chat history

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Send chat history when user joins
  socket.emit("chat_history", messages);

  // User sets name
  socket.on("set_username", (name) => {
    users[socket.id] = name;
    io.emit("users", Object.values(users));
  });

  // Handle messages
  socket.on("send_message", (data) => {
    const msg = {
      sender: users[socket.id] || "Anonymous",
      message: data.message,
    };
    messages.push(msg); // Save message
    io.emit("receive_message", msg);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("users", Object.values(users));
  });
});

server.listen(3001, () =>
  console.log("Server running on http://localhost:3001")
);
