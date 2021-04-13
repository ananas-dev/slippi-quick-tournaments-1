import type { Player, Bracket } from "../types/types";

interface Node<T> {
  pointer: number;
  data?: T;
  winner?: Node<T>;
  right?: Node<T>;
  left?: Node<T>;
}

export const create = (players: Player[]): Node<Player> => {
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

  // Make the type happy
  const root = nodes.pop();
  return root ? root : { pointer: 0 };
};

export const applyResults = (
  node: Node<Player>,
  pointer: number,
  winner: Player
): void => {
  if (node.pointer == pointer) {
    node.data = winner;
  }
  if (node.left && node.right) {
    applyResults(node.left, pointer, winner);
    applyResults(node.right, pointer, winner);
  }
};
