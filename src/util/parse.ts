import { sum } from "./math";

declare global {
  interface Array<T> {
    sortDesc(): Array<number>;
    sortAsc(): Array<number>;
    sum(): number;
  }
}

export const nextLineParseString = (str: string): string[] => str.split("\n");

export const nextLineParseNumber = (str: string): number[] =>
  str.split("\n").map(stringToNumber);

export const stringToNumber = (val: string | number | undefined): number =>
  parseInt(`${val}`);

Array.prototype.sortDesc = function (): number[] {
  return this.sort((a, b) => b - a);
};

Array.prototype.sortAsc = function (): number[] {
  return this.sort((a, b) => a - b);
};

Array.prototype.sum = function (): number {
  return sum(this);
};
