import type { Player, Bracket } from "../types/types";

const create = (players: Player[], size: number): any => {
  if (size <= players.length) return;

  // ensure to only have the desired number
  players = players.slice(0, size - 1);

  let bracket: Bracket = {
    matches: [],
  };

  const rounds = Math.log(size) / Math.log(2) - 1;
  // u(n+1) = u(n) * 1/2
  const total_matches = (size * ((1 - Math.pow(1 / 2, rounds)) * 2)) / 2;
  const get_matches_number = (round: number, size: number) => size / round / 2;
  for (let i = 0; i < rounds; i++) {}

  players.map((player, index) => {});
};
