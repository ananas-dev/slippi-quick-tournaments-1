import { success, error } from "./responders";
import store from './store';
import { connect } from "./commands";
import type { Player } from "./types/types";

const dataNecessary = JSON.stringify(error("We need some additional information for this command!"));

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
        if (!req.data || !req.data.name || !req.data.connectCode || req.data.name > 15 || req.data.connectCode > 8) {
          res = dataNecessary;
          break;
        }

        const incomingPlayer : Player = {
          id: address,
          name: req.data.name,
          connectCode: req.data.connectCode
        };
        connect(incomingPlayer);
        res = success("receiving data " + JSON.stringify(store.players))
    }

    return JSON.stringify(res);
  } catch(e) {
    return JSON.stringify(error("Not a proper format!"));
  }
}
