import type { Player } from "./types/types";
import store from "./store";

export function connect(player: Player) {
  store.players.push(player);
}
