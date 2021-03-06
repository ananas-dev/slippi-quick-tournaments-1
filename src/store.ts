import type { Player, Tournament } from "./types/types";

interface GlobalStore {
    players: Player[],
    tournaments: Tournament[]
}

// Default tournaments, will change it soon
var store : GlobalStore = {
    players: [],
    tournaments: [
        {
            mode: {
                bestOf: 1,
                players: 16,
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