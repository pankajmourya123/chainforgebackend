import app from "./app.js";
import { connectDB } from "./config/database.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
