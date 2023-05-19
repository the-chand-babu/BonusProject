const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const { Socket } = require("engine.io");

const port = process.env.PORT || 4500;

const app = express();
app.use(cors());

const server = http.createServer(app);
const users = [{}];

app.get("/", (req, res) => {
  res.send("HELL ITS WORKING");
});

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("new connection ");
  
  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: ` ${users[socket.id]} has joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat,${users[socket.id]} `,
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("connectionLost", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]}  has left`,
    });
    console.log(`user left`);
  });
});

server.listen(port, () => {
  console.log("server is working");
});
