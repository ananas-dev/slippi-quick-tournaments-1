import type { Player, Bracket } from "../types/types";

interface Node<T> {
  pointer?: number;
  data?: T;
  right?: Node<T>;
  left?: Node<T>;
}

const create = (players: Player[], size: number): any => {
  if (size <= players.length) return;

  // ensure to only have the desired number
  players = players.slice(0, size - 1);

  let nodes: Node<Player>[] = [];
  let queue: number[] = [];

  players.map((player: Player, iter: number) => {
    nodes.push({
      pointer: iter,
      data: player,
    });
    queue.push(iter);
  });

  while (queue.length > 1) {
    let left = queue.pop();
    let right = queue.pop();

    nodes.push({
      pointer: queue.length,
      left: nodes[left || 0],
      right: nodes[right || 0],
    });

    queue.push(queue.length);
  }
};
