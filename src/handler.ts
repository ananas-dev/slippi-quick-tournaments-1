import { success, error } from "./responders";
import store from './store';
import { connect, list } from "./commands";
import type { Player } from "./types/types";

const dataNecessary = error("We need some additional information for this command!");

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
        if (store.players.some(value => value.id === address)) {
          res = error("You are already connected!");
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
          message: JSON.stringify(list())
        }
      case "list":
        res = {
          type: "list",
          message: JSON.stringify(list())
        }
    }

    return JSON.stringify(res);
  } catch(e) {
    return JSON.stringify(error("Not a proper format!"));
  }
}
