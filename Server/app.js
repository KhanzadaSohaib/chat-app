const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("user-message", (message) => {
    io.emit("message", message); // Broadcast the message to all clients
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
