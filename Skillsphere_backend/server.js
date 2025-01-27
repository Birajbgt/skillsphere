import cloudinary from "cloudinary";
import { createServer } from "http"; // Import HTTP server
import { Server } from "socket.io"; // Import Socket.IO
import app from "./app.js";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Create HTTP server
const server = createServer(app); // Use the same app for the HTTP server

// Initialize Socket.IO with the same server instance
const io = new Server(server, {
  cors: {
    origin: true, // Make sure the frontend URL is correct
    credentials: true,
  },
});

// WebSocket event handling
// On the server-side (in your WebSocket handling code)
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("join-room", (applicationId, callback) => {
//     socket.join(applicationId); // Join the same room based on application ID
//     console.log(`User ${socket.id} joined room: ${applicationId}`);

//     // Acknowledge the join request
//     callback({ success: true });
//   });

//   socket.on("interview-scheduled", ({ applicationId, interviewDate, interviewTime }) => {
//     // You can notify both participants (employer and job seeker) to join the call
//     io.to(applicationId).emit("join-room", applicationId); // Notify both the employer and job seeker
//   });

//   socket.on("start-video-call", ({ roomId, applicationId }) => {
//     // Emit event to both participants that the video call is starting
//     io.to(roomId).emit("start-video-call", { roomId, applicationId });
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });

const rooms = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-room", ({ roomId }) => {
    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push(socket.id);

    rooms[roomId].forEach((peerId) => {
      if (peerId !== socket.id) {
        socket.to(peerId).emit("user-joined", {
          socketId: socket.id,
        });
      }
    });

    console.log(`User ${socket.id} joined room: ${roomId}`);
    socket.join(roomId);
  });

  socket.on("peer-offer", ({ socketId, offer }) => {
    socket.to(socketId).emit("peer-offer", { socketId: socket.id, offer });
  });

  socket.on("peer-answer", ({ socketId, answer }) => {
    socket.to(socketId).emit("peer-answer", { socketId: socket.id, answer });
  });

  socket.on("ice-candidate", ({ socketId, candidate }) => {
    socket.to(socketId).emit("ice-candidate", { socketId: socket.id, candidate });
  });

  socket.on("leave-room", ({ roomId }) => {
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
      socket.to(roomId).emit("user-left", { socketId: socket.id });
    }
    socket.leave(roomId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    Object.keys(rooms).forEach((roomId) => {
      rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
      socket.to(roomId).emit("user-left", { socketId: socket.id });
    });
  });
});


// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("join-room", ({ roomId, user }, callback) => {
//     console.log(`${user.role} joined room: ${roomId}`);
//     // socket.join(roomId);

//     // Notify others in the room
//     socket.to(roomId).emit("user-joined", { userId: socket.id, user });

//     // Check if the callback exists and call it
//     if (callback && typeof callback === "function") {
//       callback({ success: true });
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });


// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
