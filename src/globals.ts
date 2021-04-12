import type { Player, Tournament } from "./types/types";

interface Store {
  players?: Player[];
  tournaments?: Tournament[];
}

declare global {
  var STORE: Store;
}
