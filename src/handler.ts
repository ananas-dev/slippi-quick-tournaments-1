import { error } from "./responders";
import store from './store';
import { connect, list, queue, dequeue } from "./commands";
import type { Player } from "./types/types";
import { isTournamentMode } from "./types/types"

const dataNecessary = error("We need some additional information for this command!");
const notConnected = error("You are not connected!");
const getPlayerFromId = (id: string) => store.players.find(value => value.id === id);

export function handleMessage(incoming: string, address : string): string {
  try {
    const req = JSON.parse(incoming);

    if (!req) {
      return JSON.stringify(error("Didn't send anything!"));
    } else if (!req.command) {
      return JSON.stringify(error("Didn't receive any command!"));
    }

    let res: any;

    switch (req.command) {
      case "connect":
        if (getPlayerFromId(address)) {
          res = {
            type: "list",
            message: list()
          };
          break;
        }
        // MVP validation as we don't have access to slippi servers yet
        if (!req.data || req.data.name?.length > 15 || req.data.connectCode?.length > 8) {
          res = dataNecessary;
          break;
        }

        const incomingPlayer : Player = {
          id: address,
          name: req.data.name,
          connectCode: req.data.connectCode
        };
        connect(incomingPlayer);
        res = {
          type: "list",
          message: list()
        };
        break;
      case "list":
        var player = getPlayerFromId(address);
        if (!player) {
          res = notConnected;
          break;
        }
        res = {
          type: "list",
          message: list(),
          inqueue: store.tournaments.find(tournament => tournament.players.some(player => player.id === address))?.mode
        };
        break;
      case "queue":
        var player = getPlayerFromId(address);
        if (!player) {
          res = notConnected;
          break;
        }
        if (!req.data || !isTournamentMode(req.data)) {
          res = dataNecessary;
          break;
        }

        queue(player, req.data);
        res = {
          type: "queued",
          message: list(),
          mode: req.data
        };
        break;
      case "dequeue":
        var player = getPlayerFromId(address);
        if (!player) {
          res = notConnected;
          break;
        }

        const result = dequeue(player);
        if (result) {
          res = {
            type: "dequeued",
            message: list()
          }
        } else {
          res = error("Couldn't dequeue from tournament!");
        }
    }

    return JSON.stringify(res);
  } catch(e) {
    return JSON.stringify(error("Not a proper format!"));
  }
}
