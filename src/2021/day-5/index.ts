import { nextLineParseString } from "../../util/parse";
import { input } from "./data";

const formatStartFinish = (val: string) => {
  const splitted = val.split(",");
  return { x: splitted[0], y: splitted[1] };
};

const parsedInput = nextLineParseString(input).map((i) => {
  const splittedNav = i.split(" -> ");
  return {
    start: formatStartFinish(splittedNav[0]),
    finish: formatStartFinish(splittedNav[1]),
  };
});

const partOneDirections = parsedInput.filter(
  (i) => i.start.x === i.finish.x || i.start.y === i.finish.y
);
console.log(partOneDirections);
