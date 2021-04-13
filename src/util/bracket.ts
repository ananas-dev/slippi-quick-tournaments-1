import type { Player, Bracket } from "../types/types";

interface Node<T> {
  pointer: number;
  data?: T;
  right?: Node<T>;
  left?: Node<T>;
}

export const create = (players: Player[]): any => {
  let nodes: Node<Player>[] = [];
  let queue: number[] = [];
  let pointer: number = 0;

  players.map((player: Player) => {
    nodes.push({
      pointer: pointer,
      data: player,
    });
    queue.push(pointer);
    pointer++;
  });

  while (queue.length > 1) {
    let left = queue.shift();
    let right = queue.shift();

    nodes.push({
      pointer: pointer,
      left: left != undefined ? nodes[left] : undefined,
      right: right != undefined ? nodes[right] : undefined,
    });

    queue.push(pointer);
    pointer++;
  }
  return nodes.pop();
};
