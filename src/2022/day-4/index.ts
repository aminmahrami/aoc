import { nextLineParseString } from "../../util/parse";
import { input } from "./data";

export const parsedInput = nextLineParseString(input).map((i) =>
  i.split(",").map((i) => i.split("-").map((i) => parseInt(i)))
);

const isInside = (a: number[], b: number[]) =>
  a[0] >= b[0] && a[0] <= b[1] && a[1] >= b[0] && a[1] <= b[1];

const isOverlapping = (a: number[], b: number[]) =>
  (a[0] >= b[0] && a[0] <= b[1]) || (a[1] >= b[0] && a[1] <= b[1]);

// Applies the check function both ways
const filter = (checkFn: (a: number[], b: number[]) => boolean) =>
  parsedInput.filter((plan) => {
    const [elfOne, elfTwo] = plan;
    return checkFn(elfOne, elfTwo) || checkFn(elfTwo, elfOne);
  });

console.log("Solution 1: ", filter(isInside).length);
console.log("Solution 2: ", filter(isOverlapping).length);
