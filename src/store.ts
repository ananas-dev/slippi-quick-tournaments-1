import type { Player } from "./types/types";

interface GlobalStore {
    players: Player[]
}

var store : GlobalStore = {
    players: []
};

export default store;