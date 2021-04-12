import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { handleMessage } from "./handler";

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    const res = handleMessage(message);
    ws.send(res);
  });
  ws.send("connected");
});

//start our server
server.listen(port, () => {
  console.log(`:: Server started on ${port}`);
});
