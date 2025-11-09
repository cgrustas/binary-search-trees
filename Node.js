/**
 * Represents a node in a binary search tree. Each node contains a 'left' and 'right' child.
 * Nodes with no left or right child store a 'null' value in its place.
 */
export class Node {
  #data;
  #left;
  #right;

  constructor(data, left = null, right = null) {
    this.#data = data;
    this.#left = left;
    this.#right = right;
  }

  get data() {
    return this.#data;
  }

  set left(left) {
    this.#left = left;
  }

  set right(right) {
    this.#right = right;
  }
}
