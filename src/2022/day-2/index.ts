import { nextLineParseString } from "../../util/parse";
import { input } from "./data";

const parsedInput = nextLineParseString(input).map((i) => i.split(" "));

const opponentMap: any = {
  A: { name: "rock", point: 1 },
  B: { name: "paper", point: 2 },
  C: { name: "scissors", point: 3 },
};

const meMap: any = {
  X: { name: "rock", point: 1 },
  Y: { name: "paper", point: 2 },
  Z: { name: "scissors", point: 3 },
};

export const getPoints = (a: string, b: string) => {
  const opponent = opponentMap[a];
  const me = meMap[b];
  if (opponent.name === me.name) {
    return me.point + 3;
  }
  return (me.name === "rock" && opponent.name === "scissors") ||
    (me.name === "paper" && opponent.name === "rock") ||
    (me.name === "scissors" && opponent.name === "paper")
    ? me.point + 6
    : me.point;
};

const getVerdict = (v: string) => {
  if (v === "X") {
    return -1;
  } else if (v === "Y") {
    return 0;
  } else {
    return 1;
  }
};

const needToWin = (a: string) => {
  if (a === "A") {
    return "Y";
  } else if (a === "B") {
    return "Z";
  } else {
    return "X";
  }
};

const needToLose = (a: string) => {
  if (a === "B") {
    return "X";
  } else if (a === "A") {
    return "Z";
  } else {
    return "Y";
  }
};

const needToDraw = (a: string) => {
  if (a === "A") {
    return "X";
  } else if (a === "B") {
    return "Y";
  } else {
    return "Z";
  }
};

function solutionOne() {
  return parsedInput.reduce(
    (acc, curr) => getPoints(curr[0], curr[1]) + acc,
    0
  );
}

function solutionTwo() {
  return parsedInput.reduce((acc, curr) => {
    const verdict = getVerdict(curr[1]);
    const myMove =
      verdict === 0
        ? needToDraw(curr[0])
        : verdict === 1
        ? needToWin(curr[0])
        : needToLose(curr[0]);
    return getPoints(curr[0], myMove) + acc;
  }, 0);
}

console.log("Solution 1: ", solutionOne());
console.log("Solution 2: ", solutionTwo());
