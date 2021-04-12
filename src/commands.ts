import type { Player } from "./types/types";

export function connect(player: Player) {
  window.STORE.players?.push(player);
}
