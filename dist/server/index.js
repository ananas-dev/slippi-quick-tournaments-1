"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const handler_1 = require("./handler");
const store_1 = require("./store");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws, req) => {
    if (!req.socket.remoteAddress) {
        ws.send("error");
        return;
    }
    ws.on('close', () => {
        store_1.default.players = store_1.default.players.filter(value => value.id !== req.socket.remoteAddress);
    });
    ws.on("message", (message) => {
        const res = handler_1.handleMessage(message, "" + req.socket.remoteAddress);
        ws.send(res);
    });
    ws.send("connected");
});
//start our server
server.listen(port, () => {
    console.log(`:: Server started on ${port}`);
});
//# sourceMappingURL=index.js.map