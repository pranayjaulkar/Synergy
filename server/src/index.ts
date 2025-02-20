import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/Synergy";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database Connection Error:", err));

app.get("/", async (req, res) => {
  res.set({ "Content-Type": "text/html" }).send(`<h1>Hello World</h1>`);
});

io.on("connection", (socket) => {
  console.log("A new user connected", socket);
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

