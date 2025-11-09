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

    this.#root = this.buildTree(sortedUniqueArray);
  }

  /**
   * Builds a balanced BST full of `Node` objects from the given array
   * @param {number[]} array - the sorted array of numbers
   * @returns {Node|null} level-0 root node of the balanced BST
   */
  buildTree(array) {
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
}
