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
    this.#root = this.#insertHelp(this.#root, value);
  }

  /**
   * Helper for insert(). Inserts the given value into the given node.
   * If the given value already appears in the root's subtree, insertion does not occur.
   * @param {Node} root - the node to insert the value within
   * @param {number} value - the value to insert within the node
   * @returns {Node} the root node, or the new inserted node
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

  /**
   * Deletes the given value from the BST.
   * If value does not appear in the subtree, nothing occurs.
   * @param {number} value - the value to be deleted
   * @returns {void}
   */
  deleteItem(value) {
    this.#root = this.#deleteItemHelp(this.#root, value);
  }

  /**
   * Helper for deleteItem(). Deletes the given value from the
   * root's subtree.
   * @param {Node} root - the root node
   * @param {number} value - the value to delete within the node
   * @returns {Node} the node to connect to the parent
   */
  #deleteItemHelp(root, value) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.#deleteItemHelp(root.left, value);
    } else if (value > root.data) {
      root.right = this.#deleteItemHelp(root.right, value);
    } else {
      const hasNoChildren = !root.left && !root.right;
      const hasOneChild =
        (root.left && !root.right) || (!root.left && root.right);

      if (hasNoChildren) {
        return null;
      } else if (hasOneChild) {
        return root.left ? root.left : root.right;
      } else {
        const replacementNode = this.#getSuccessor(root);
        root.data = replacementNode.data;
        root.right = this.#deleteItemHelp(root.right, replacementNode.data);
      }
    }

    return root;
  }

  /**
   * Returns the in-order successor of the given root (smallest value in the right subtree)
   * @param {Node} root - root of the BST
   * @returns {Node} successor
   */
  #getSuccessor(root) {
    let curr = root.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  /**
   * Gets the node with the given value in the BST
   * @param {number} value - value to find
   * @returns {Node|null} node with matching value, or null if not found
   */
  find(value) {
    return this.#findHelp(this.#root, value);
  }

  /**
   * Helper for find(). Gets the node the given value in the BST
   * @param {Node} root - the current root of the subtree
   * @param {number} value - the value to find
   * @returns {Node|null} node with matching value, or null if not found
   */
  #findHelp(root, value) {
    if (root === null) return null;

    if (value < root.data) {
      return this.#findHelp(root.left, value);
    } else if (value > root.data) {
      return this.#findHelp(root.right, value);
    } else {
      return root;
    }
  }

  /**
   * @callback NodeCallback
   * @param {Node} node - the current node being processed
   * @returns {void}
   */

  /**
   * Traverses the tree in breadth-first level order.
   * Calls the callback on each node as it traverses, passing the whole node as an argument.
   * @param {NodeCallback} callback - function to execute on each node
   * @returns {void}
   * @throws {TypeError} throws error if no callback function is provided
   */
  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("No callback function is provided!");
    }

    if (this.#isEmpty()) return;

    const queue = [];
    queue.push(this.#root);

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  /**
   * Gets the height of the node containing the given value.
   * Height is defined as the number of edges in the longest path from that node to a leaf node.
   * @param {number} value - the value to find in the tree
   * @returns {number|null} height, or null if value is not found in the tree
   */
  height(value) {
    const node = this.find(value);
    if (!node) return null;

    return this.#heightHelp(node);
  }

  /**
   * Helper for height(). Calculates the height of a subtree rooted at the given node.
   * @param {Node} root - node to find the longest path for
   * @returns {number} height of the subtree, or -1 if root is null
   */
  #heightHelp(root) {
    if (root === null) return -1;
    else {
      return (
        1 + Math.max(this.#heightHelp(root.left), this.#heightHelp(root.right))
      );
    }
  }

  /**
   * Gets the depth of the node containing the given value.
   * Depth is defined as the number of edges in the path from that node to the root node.
   * @param {number} value - the value to find in the tree
   * @returns {number|null} depth of the node, or null if value is not found in the tree
   */
  depth(value) {
    return this.#depthHelp(this.#root, value);
  }

  /**
   * Helper for depth(). Gets the number of edges from the root node to
   * the node containing the given value.
   * @param {Node} root - current root of the tree
   * @param {*} value - the value to find in the tree
   * @returns {number|null} depth of the node, or null if value is not found in the tree
   */
  #depthHelp(root, value) {
    if (!root) return null;

    if (value < root.data) {
      const leftResult = this.#depthHelp(root.left, value);
      if (leftResult === null) return null;
      return 1 + leftResult;
    } else if (value > root.data) {
      const rightResult = this.#depthHelp(root.right, value);
      if (rightResult === null) return null;
      return 1 + rightResult;
    } else {
      return 0;
    }
  }
}
