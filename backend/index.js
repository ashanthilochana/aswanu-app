import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import corsMiddleware from "./middleware/cors.middleware.js";
import socketConfig from "./config/web-socket.config.js";

//importing user routes
import { default as userRouter } from "./routes/user.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server);

// Configure CORS for both Express and Socket.IO
app.use(corsMiddleware);

// For JSON payloads
app.use(express.json());

app.use(userRouter);


// Socket.IO configuraton
socketConfig(io);

// Set the port from the environment variable or use a default
const PORT = process.env.PORT || 5500;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});