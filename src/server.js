import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";


config(); // carga las variables de entorno del .env
connectDB(); // conecta a la base de datos

const app = express();
const PORT = 3000;

// Body parsing middlewares
// para que nodejs pueda leer json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);


// keep the server running
app.listen(PORT, () => {
    console.log(`Server runnig on PORT: ${PORT}`)
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});