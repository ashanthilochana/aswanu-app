import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

//importing config
import corsMiddleware from "./middleware/cors.middleware.js";
import socketConfig from "./config/web-socket.config.js";
import { scheduleCronJobs } from "./config/cron.config.js";

//importing user routes
import { default as userRouter } from "./routes/user.routes.js";
import { default as sensorRouter } from "./routes/sensor.routes.js";
import { default as tankRouter } from "./routes/tanks.routes.js";
import { default as solutionsRouter } from "./routes/solutions.routes.js";
import { default as variationRouter } from "./routes/variations.routes.js";
import { default as dieasecategoryRouter } from "./routes/dieasecategory.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000"
  }
});



// Configure CORS for both Express and Socket.IO
app.use(corsMiddleware);

// For JSON payloads
app.use(express.json());

// using routes
app.use(userRouter);
app.use(sensorRouter);
app.use(tankRouter);
app.use(solutionsRouter);
app.use(variationRouter);
app.use(dieasecategoryRouter);


// using Socket.IO configuraton
socketConfig(io);

// Set the port from the environment variable or use a default
const PORT = process.env.PORT || 5500;

//executing cron jobs
scheduleCronJobs();

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
