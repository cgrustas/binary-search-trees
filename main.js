import { Tree } from "./Tree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 95, 28]);
console.log(
  `1. Is tree balanced? expected: true, actual: ${tree.isBalanced()} `
);
console.log(`2. `);
