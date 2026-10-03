import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import { config } from "dotenv";

config();

const app = express();
const PORT = 3000;

// API routes
app.use("/movies", movieRoutes);


// keep the server running
app.listen(PORT, () => {
    console.log(`Server runnig on PORT: ${PORT}`)
});