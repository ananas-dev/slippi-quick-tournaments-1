export interface TournamentMode {
  bestOf: number;
  solo: boolean;
  players: number;
}

export interface Tournament {
  mode: TournamentMode;
  bracket: Bracket;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  connectCode: string;
}

export interface Match {
  id: number;
  players: Player[];
  round: number;
  winner?: Player;
  nextMatch?: number;
}

export interface Bracket {
  matches: Match[];
}
