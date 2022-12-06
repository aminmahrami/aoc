import { input } from "../day-6/data";

const isUnique = (arr: string[]) => new Set(arr).size === arr.length;

function findMarkerPosition(buffer: string, uniqueSequenceLength: number) {
  const bufferArray = [...buffer];

  for (let index = 0; index < bufferArray.length; index++) {
    const seq = buffer.substring(index, index + uniqueSequenceLength);
    if (isUnique([...seq])) {
      return index + uniqueSequenceLength;
    }
  }

  throw new Error("No Elf communication this time");
}

console.log(findMarkerPosition(input, 4));
console.log(findMarkerPosition(input, 14));
