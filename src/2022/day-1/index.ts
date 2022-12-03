import { sum } from "../../util/math";
import { stringToNumber } from "../../util/parse";
import { input } from "./data";

const parsedInput = input
  .split("\n\n")
  .map((i) => i.split("\n").map(stringToNumber));

function solutionOne() {
  return parsedInput.reduce((accMax, curr) => Math.max(curr.sum(), accMax), 0);
}

function solutionTwo() {
  return parsedInput.map(sum).sortAsc().slice(-3).sum();
}

console.log("Solution 1: ", solutionOne());
console.log("Solution 2: ", solutionTwo());
