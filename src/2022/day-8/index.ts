import { nextLineParseString, stringToNumber } from "../../util/parse";
import { input as rawInput } from "./data";

const input = nextLineParseString(rawInput).map((i) =>
  i.split("").map(stringToNumber)
);
let countTallest = 0;

function solutionOne() {
  input.forEach((trees, rowIndex) => {
    trees.forEach((tree, treeIndex) => {
      // Is on the edge
      if (
        treeIndex === 0 ||
        treeIndex === trees.length - 1 ||
        rowIndex === 0 ||
        rowIndex === input.length - 1
      ) {
        countTallest++;
        return;
      }

      // Check Left and Right
      const maxLeftThree = trees.slice(0, treeIndex).sortDesc()[0];
      const maxRightTree = trees.slice(treeIndex + 1).sortDesc()[0];
      if (
        (maxLeftThree !== tree && Math.max(maxLeftThree, tree) === tree) ||
        (maxRightTree !== tree && Math.max(maxRightTree, tree) === tree)
      ) {
        countTallest++;
        return;
      }
      const column = [];
      for (let index = 0; index < input.length; index++) {
        const row = input[index];
        column.push(row[treeIndex]);
      }

      // Check Up and Down
      const maxUpThree = column.slice(0, rowIndex).sortDesc()[0];
      const maxDownTree = column.slice(rowIndex + 1).sortDesc()[0];
      if (
        (maxUpThree !== tree && Math.max(maxUpThree, tree) === tree) ||
        (maxDownTree !== tree && Math.max(maxDownTree, tree) === tree)
      ) {
        countTallest++;
        return;
      }
    });
  });

  return countTallest;
}

let highestScenicView = 0;

function solutionTwo() {
  input.forEach((trees, rowIndex) => {
    trees.forEach((tree, treeIndex) => {
      // Check Left and Right
      const leftView =
        trees
          .slice(0, treeIndex)
          .reverse()
          .findIndex((i) => i >= tree) +
          1 ===
        0
          ? trees.slice(0, treeIndex).length
          : trees
              .slice(0, treeIndex)
              .reverse()
              .findIndex((i) => i >= tree) + 1;
      const rightView =
        trees.slice(treeIndex + 1).findIndex((i) => i >= tree) + 1 === 0
          ? trees.slice(treeIndex + 1).length
          : trees.slice(treeIndex + 1).findIndex((i) => i >= tree) + 1;
      const column = [];
      for (let index = 0; index < input.length; index++) {
        const row = input[index];
        column.push(row[treeIndex]);
      }

      // Check Up and Down
      const UpperView =
        column
          .slice(0, rowIndex)
          .reverse()
          .findIndex((i) => i >= tree) +
          1 ===
        0
          ? column.slice(0, rowIndex).length
          : column
              .slice(0, rowIndex)
              .reverse()
              .findIndex((i) => i >= tree);

      const BelowView =
        column.slice(rowIndex + 1).findIndex((i) => i >= tree) + 1 === 0
          ? column.slice(rowIndex + 1).length
          : column.slice(rowIndex + 1).findIndex((i) => i >= tree) + 1;

      const range = UpperView * BelowView * leftView * rightView;
      if (highestScenicView < range) {
        highestScenicView = range;
      }
    });
  });

  return highestScenicView;
}

console.log("Solution 1: ", solutionOne());
console.log("Solution 2: ", solutionTwo());
