import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import { errorMiddleware } from "./middlewares/error.js"; // Import errorMiddleware correctly

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors({
    origin: '*', // Adjust this as necessary for your application
  }));

// API routes
app.use("/api/v1", userRoutes);

// Error handling middleware (should be last)
app.use(errorMiddleware);

// Root route for basic testing
app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/me", (req, res) => {
  res.send("Hello");
});
export default app;
