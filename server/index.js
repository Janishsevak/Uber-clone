import dotenv from "dotenv";
dotenv.config();
import express from 'express'; // Removed { urlencoded }
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from './db/Db.js';
import router from './routes/user.routes.js';
import captainrouter from './routes/captain.routes.js';
import mapsrouter from './routes/maps.routes.js'; // Import your maps router
import riderouter from './routes/ride.routes.js'; // Import your ride router
import bodyParser from "body-parser";
const app = express();

// ✅ Correct CORS setup
const corsOptions = {
origin: ["http://localhost:5173", "http://192.168.184.226:5173","https://lkbtj0h0-5173.inc1.devtunnels.ms"],
methods: ['GET', 'POST'],
credentials: true, // Change to true if cookies/authorization headers are needed
allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true })); // Use urlencoded middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Database connection with error handling
try {
connectDb();
console.log("Database connected successfully");
} catch (error) {
console.error("Database connection failed:", error);
process.exit(1); // Exit the process if DB connection fails
}

// Your routes
app.use("/api/user", router);
app.use("/api/captain", captainrouter);
app.use("/api/maps", mapsrouter);
app.use("/api/ride", riderouter);
app.get('/ping', (req, res) => {
res.send('pong');
});

// Error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send({ error: "Something went wrong!" });
});

export default app;
