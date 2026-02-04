import mongoose from "mongoose";
import app from "./app";
import { connectDb } from "./config/db";

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
