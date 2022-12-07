import { nextLineParseString } from "../../util/parse";
import { sample as rawInput } from "./data";

const input = nextLineParseString(rawInput);

const directories = new Map<string, number>();

/**
 * Works with sample but not with real data
 * AOC says the result is too low
 */
function openAndGetSize(indexOfCommand: number, path: string): any {
  let line = input[indexOfCommand];
  if (!line) {
    console.log(directories);
    return directories;
  }

  if (line.startsWith("$")) {
    const action = line.substring(2, 4);
    if (action === "cd") {
      const dirToOpen = line.substring(5);
      if (dirToOpen === "..") {
        const outerDir = path.split("/").slice(0, -1).join("/");
        console.log("got back: ", outerDir);
        return openAndGetSize(indexOfCommand + 1, outerDir);
      }
      const newPath = dirToOpen === "/" ? path : path + "/" + dirToOpen;
      return openAndGetSize(indexOfCommand + 1, newPath);
    } else if (action === "ls") {
      return openAndGetSize(indexOfCommand + 1, path);
    }
  } else if (line.startsWith("dir")) {
    return openAndGetSize(indexOfCommand + 1, path);
  } else {
    path.split("/").forEach((i) => {
      const size = parseInt(line.split(" ")[0]);
      const current = directories.get(i);
      directories.set(i, (current || 0) + size);
    });

    return openAndGetSize(indexOfCommand + 1, path);
  }
  throw new Error("Unhandled command");
}

const partOne = [...openAndGetSize(0, "")].filter((i) => i[1] <= 100000);
console.log(
  "Solution 1: ",
  partOne.reduce((c, n) => c + n[1], 0)
);
