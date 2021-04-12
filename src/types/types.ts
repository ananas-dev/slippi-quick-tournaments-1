export interface TournamentMode {
  best_of: number;
  solo: boolean;
  player_number: number;
}

export interface Tournament {
  mode: TournamentMode;
  bracket: Bracket;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  connect_code: string;
}

export interface Match {
  id: number;
  players: Player[];
  round: number;
  winner?: Player;
  next_match?: number;
}

export interface Bracket {
  matches: Match[];
}
