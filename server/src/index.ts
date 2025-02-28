import express from "express";
import mongoose from "mongoose";
import http from "http";
import WebSocket from "ws";
const ywsUtils = require("y-websocket/bin/utils");

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/Synergy";

const app = express();
const server = http.createServer(app);

mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database Connection Error:", err));

app.get("/", async (req, res) => {
  res.set({ "Content-Type": "text/html" }).send(`<h1>Hello World</h1>`);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (conn: WebSocket, req: Request) => {
  ywsUtils.setupWSConnection(conn, req, {
    gc: req.url.slice(1) !== "ws/prosemirror-versions",
  });
});

// setInterval(() => {
//   let conns = 0;
//   ywsUtils.docs.forEach((doc: any) => {
//     conns += doc.conns.size;
//   });
//   const stats = {
//     conns,
//     docs: ywsUtils.docs.size,
//     websocket: `ws://localhost:${PORT}`,
//     http: `http://localhost:${PORT}`,
//   };
//   console.log(
//     `${new Date().toLocaleString("en-IN")} Stats: ${JSON.stringify(stats)}`
//   );
// }, 10000);

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
