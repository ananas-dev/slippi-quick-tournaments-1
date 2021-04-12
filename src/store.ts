import type { Player, Tournament } from "./types/types";

interface GlobalStore {
    players: Player[],
    tournaments: Tournament[]
}

var store : GlobalStore = {
    players: [],
    tournaments: [
        {
            mode: {
                best_of: 1,
                player_number: 16,
                solo: true
            },
            bracket: {
                matches: []
            },
            players: []
        }
    ]
};

export default store;