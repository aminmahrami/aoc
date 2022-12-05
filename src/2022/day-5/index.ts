import { nextLineParseString } from "../../util/parse";
import { procedure, stacks } from "./data";

const formatResult = (map: Map<number, string[]>) =>
  [...map].map((i) => i[1].pop()).join("");

const constructStacks = () => {
  const stacksMap = new Map<number, string[]>();

  const rows = nextLineParseString(stacks)
    .reverse()
    .map((i) => i.split(" "));

  rows.forEach((row) => {
    row.forEach((item, stackIndex) => {
      if (item === "[x]") {
        return;
      }
      const stackNumber = stackIndex + 1;
      const current = stacksMap.get(stackNumber);
      stacksMap.set(stackNumber, current ? [...current, item] : [item]);
    });
  });
  return stacksMap;
};

const parsedProcedure = nextLineParseString(procedure).map((s) =>
  s
    .replace(/[^0-9.]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((i) => parseInt(i))
);

export function solutionOne() {
  const stacksMap = constructStacks();
  parsedProcedure.forEach((p) => {
    const [amount, source, target] = p;
    for (let index = 0; index < amount; index++) {
      const sourceStack = stacksMap.get(source);
      if (!sourceStack) {
        throw new Error("sourceStack is undefined");
      }
      const item = sourceStack.pop();
      stacksMap.set(source, sourceStack);
      if (!item) {
        throw new Error("popped item is undefined");
      }
      const targetStack = stacksMap.get(target);
      stacksMap.set(target, targetStack ? [...targetStack, item] : [item]);
    }
  });

  return formatResult(stacksMap);
}

function solutionTwo() {
  const stacksMap = constructStacks();
  parsedProcedure.forEach((p) => {
    const [amount, source, target] = p;
    const sourceStack = stacksMap.get(source);
    if (!sourceStack) {
      throw new Error("sourceStack is undefined");
    }
    const items = sourceStack.slice(-amount);
    sourceStack.splice(-amount);
    stacksMap.set(source, sourceStack);

    const targetStack = stacksMap.get(target);
    stacksMap.set(target, targetStack ? [...targetStack, ...items] : items);
  });

  return formatResult(stacksMap);
}

console.log("Solution 1: ", solutionOne());
console.log("Solution 2: ", solutionTwo());
