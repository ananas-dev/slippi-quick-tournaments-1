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

// Type guard
export const isTournamentMode = (input: any): input is TournamentMode => {
  const schema: Record<keyof TournamentMode, string> = {
      bestOf: 'number',
      solo: 'boolean',
      players: 'number'
  };

  const missingProperties = Object.keys(schema)
      .filter(key => input[key] === undefined)
      .map(key => key as keyof TournamentMode)
      .map(key => new Error(`Document is missing ${key} ${schema[key]}`));

  return missingProperties.length === 0;
}
