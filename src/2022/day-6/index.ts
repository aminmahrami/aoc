import { input } from "../day-6/data";

const isUnique = (arr: string[]) => new Set(arr).size === arr.length;

function findMarkerPosition(uniqueSequenceLength: number) {
  const bufferArray = [...input];

  for (let index = 0; index < bufferArray.length; index++) {
    const seq = input.substring(index, index + uniqueSequenceLength);
    if (isUnique([...seq])) {
      return index + uniqueSequenceLength;
    }
  }

  throw new Error("No Elf communication this time");
}

console.log("Solution 1: ", findMarkerPosition(4));
console.log("Solution 2: ", findMarkerPosition(14));
