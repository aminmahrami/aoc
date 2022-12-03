import { nextLineParseString } from "../../util/parse";
import { input } from "./data";
import * as _ from "lodash";
import { chunk } from "lodash";
export const parsedInput = nextLineParseString(input);

const splitInHalf = (str: string) => [
  str.slice(0, str.length / 2).split(""),
  str.slice(str.length / 2, str.length).split(""),
];

const positionInAlphabet = (char: string) =>
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char) + 1;

export function solutionOne() {
  return parsedInput.reduce((sum, next) => {
    const inHalf = splitInHalf(next);
    const intersection = _.intersection(...inHalf);
    if (intersection.length) {
      return positionInAlphabet(intersection[0]) + sum;
    }
    return sum;
  }, 0);
}

export function solutionTwo() {
  return chunk(parsedInput, 3).reduce((sum, next) => {
    const intersection = _.intersection(...next.map((i) => i.split("")));
    if (intersection.length) {
      return positionInAlphabet(intersection[0]) + sum;
    }
    return sum;
  }, 0);
}

console.log("Solution 1: ", solutionOne());
console.log("Solution 2: ", solutionTwo());
