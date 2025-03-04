import express, { NextFunction, Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import WebSocket from "ws";
import { userRouter } from "./routes/user.route";
const ywsUtils = require("y-websocket/bin/utils");

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/Synergy";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const logger: RequestHandler = (req, res, next) => {
  const time = new Date(Date.now());
  console.log(`[ ${time.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} ]  ${req.method.toUpperCase()}  ${req.url}`);
  next();
};

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(logger);
app.use("/api/users", userRouter); // Register routes before error handler

mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database Connection Error:", err));

wss.on("connection", (conn: WebSocket, req: Request) => {
  ywsUtils.setupWSConnection(conn, req, {
    gc: req.url.slice(1) !== "ws/prosemirror-versions",
  });
});

app.all("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  error.logError();
  res.status(error.status || 500).json({
    errorMessage: error.message,
    code: error.code,
    ...(error.data ? { data: error.data } : {}),
  });
});

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
