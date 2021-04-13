import type { Player, TournamentMode } from "./types/types";
import store from "./store";

export function connect(player: Player) {
  store.players.push(player);
}

export function list() {
  return store.tournaments.map(tournament => [
    tournament.mode, tournament.players.length
  ]);
}
