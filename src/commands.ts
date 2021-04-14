import type { Player, TournamentMode } from "./types/types";
import equal from "fast-deep-equal";
import store from "./store";

// Connect into the system
export function connect(player: Player) {
  store.players.push(player);
}

// List queue size of every tournament
export function list() : (number | TournamentMode)[][] {
  return store.tournaments.map(tournament => [
    tournament.mode, tournament.players.length
  ]);
}

// Queue into tournament
export function queue(player: Player, mode: TournamentMode): boolean {
  var tournament = store.tournaments.find(tournament => equal(tournament.mode, mode));

  if (!tournament)
    return false;

  return tournament.players.push(player) > 0;
}

// Dequeue from tournament
export function dequeue(player: Player): boolean {
  var tournament = store.tournaments.find(tournament => tournament.players.some(entry => entry.id === player.id));
  if (!tournament)
    return false;

  const oldLength = tournament.players.length;
  tournament.players = tournament.players.filter(entry => entry.id !== player.id);
  
  return tournament.players.length !== oldLength;
}

export function cancel() {

}