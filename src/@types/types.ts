export interface TournamentMode {
  best_of: number;
  solo: boolean;
  player_number: number;
}

export interface Queue {
  mode: TournamentMode;
  players: Player;
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
  winner?: Player;
  next_match_id?: Number;
}

export interface Bracket {
  matches: Match[];
}
