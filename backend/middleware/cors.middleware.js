import cors from 'cors';

const corsOptions = {
    origin: "http://localhost:5000", // Adjust as needed for your security requirements
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

export default cors(corsOptions);