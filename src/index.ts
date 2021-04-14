import express = require("express");
import * as http from "http";
import * as WebSocket from "ws";
import { handleMessage } from "./handler";
import store from './store'

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket, req: http.IncomingMessage) => {
  if (!req.socket.remoteAddress) {
    ws.send("error");
    return;
  }

  ws.on('close', () => {
    const address = req.socket.remoteAddress;

    // Remove player from system and from tournaments he is in
    store.players = store.players.filter(value => value.id !== address);
    for (var tournament of store.tournaments) {
      tournament.players = tournament.players.filter(player => player.id !== address);
    }
  })

  ws.on("message", (message: string) => {
    const res = handleMessage(message, "" + req.socket.remoteAddress);
    ws.send(res);
  });
  ws.send("ws connected");
});

//start our server
server.listen(port, () => {
  console.log(`:: Server started on ${port}`);
});
