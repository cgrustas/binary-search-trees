import { Tree } from "./Tree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 95, 28]);
console.log(`Is tree balanced? expected: true, actual: ${tree.isBalanced()} `);
tree.prettyPrint();
console.log(
  "Level order traversal: ",
  tree.getTraversalOrder(tree.levelOrderForEach.bind(tree))
);
console.log(
  "In order traversal: ",
  tree.getTraversalOrder(tree.inOrderForEach.bind(tree))
);
console.log(
  "Pre order traversal: ",
  tree.getTraversalOrder(tree.preOrderForEach.bind(tree))
);

console.log(
  "Post order traversal: ",
  tree.getTraversalOrder(tree.postOrderForEach.bind(tree))
);

console.log("Unbalancing tree...");
tree.insert(555);
tree.insert(665);
tree.insert(777);
tree.insert(999);
console.log(`Is tree balanced? Expected: false, actual: ${tree.isBalanced()}`);
console.log("Rebalancing tree...");
tree.rebalance();
console.log(`Is tree balanced? Expected: true, actual: ${tree.isBalanced()}`);

console.log(
  "Level order traversal: ",
  tree.getTraversalOrder(tree.levelOrderForEach.bind(tree))
);
console.log(
  "In order traversal: ",
  tree.getTraversalOrder(tree.inOrderForEach.bind(tree))
);
console.log(
  "Pre order traversal: ",
  tree.getTraversalOrder(tree.preOrderForEach.bind(tree))
);

console.log(
  "Post order traversal: ",
  tree.getTraversalOrder(tree.postOrderForEach.bind(tree))
);
