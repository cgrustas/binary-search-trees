import { Node } from "./Node.js";

/**
 * Represents a balanced binary search tree for numeric values.
 * Provides operations for lookup, insertion, and deletion of data values.
 */
export class Tree {
  #root;

  /**
   * Constructs a balanced binary search tree.
   * Sorts and removes duplicates from the given array before construction.
   * @param {number[]} array - the array of numbers
   */
  constructor(array) {
    const uniqueArray = [...new Set(array)];
    const sortedUniqueArray = uniqueArray.sort((a, b) => a - b);

    this.#root = this.#buildTree(sortedUniqueArray);
  }

  /**
   * Builds a balanced BST full of `Node` objects from the given array
   * @param {number[]} array - the sorted array of numbers
   * @returns {Node|null} level-0 root node of the balanced BST
   */
  #buildTree(array) {
    return this.#buildTreeHelp(array, 0, array.length - 1);
  }

  /**
   * Helper for buildTree(). Recursively builds a balanced BST from a sorted array.
   * @param {number[]} array - the sorted array of numbers
   * @param {number} start - the start index of the subarray
   * @param {number} end - the end index of the subarray
   * @returns {Node|null} root node of the balanced BST
   */
  #buildTreeHelp(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.#buildTreeHelp(array, start, mid - 1);
    root.right = this.#buildTreeHelp(array, mid + 1, end);
    return root;
  }

  /**
   * Visualizes this binary tree.
   * @returns {void}
   */
  prettyPrint() {
    this.#prettyPrintHelp(this.#root);
  }

  /**
   * Helper for prettyPrint. Provided by The Odin Project for testing purposes.
   */
  #prettyPrintHelp(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.#prettyPrintHelp(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.#prettyPrintHelp(
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }

  /**
   * Checks if the BST is empty
   * @returns {boolean} true if BST is empty, false if BST contains a root node
   */
  #isEmpty() {
    return !this.#root;
  }

  /**
   * Inserts the given value into the BST
   * If the given value already appears in the BST, insertion does not occur.
   * @param {number} value - the number to be added
   * @returns {void}
   */
  insert(value) {
    return this.#insertHelp(this.#root, value);
  }

  /**
   * Helper for insert(). Inserts the given value into the given node.
   * If the given value already appears in the root's subtree, insertion does not occur.
   * @param {Node} root - the node to insert the value within
   * @param {number} value - the value to insert within the node
   * @returns {void}
   */
  #insertHelp(root, value) {
    if (root === null) return new Node(value);

    if (value < root.data) {
      root.left = this.#insertHelp(root.left, value);
    } else if (value > root.data) {
      root.right = this.#insertHelp(root.right, value);
    }

    return root;
  }
}
