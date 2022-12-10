import { nextLineParseString } from "../../util/parse";
import { input as inputRaw } from "./data";

let sea: number[][] = [];

for (let i = 0; i < 1000; i++) {
	const row = [];
	for (let j = 0; j < 1000; j++) {
		row.push(0);
	}
	sea.push(row);
}

const formatStartFinish = (val: string) => {
	const splitted = val.split(",");
	return { x: parseInt(splitted[0]), y: parseInt(splitted[1]) };
};

const parsedInput = nextLineParseString(inputRaw).map((i) => {
	const splittedNav = i.split(" -> ");
	return {
		start: formatStartFinish(splittedNav[0]),
		finish: formatStartFinish(splittedNav[1]),
	};
});

const partOneDirections = parsedInput.filter(
	(i) => i.start.x === i.finish.x || i.start.y === i.finish.y
);

function partOne() {
	let overlapCount = 0;
	partOneDirections.forEach((line) => {
		if (line.start.x !== line.finish.x && line.start.y === line.finish.y) {
			// H
			const lowestPoint = Math.min(line.start.x, line.finish.x);
			const value = Math.abs(line.start.x - line.finish.x);
			for (
				let index = lowestPoint;
				index <= value + lowestPoint;
				index++
			) {
				const current = sea[line.start.y][index] || 0;
				if (current === 1) {
					overlapCount++;
				}
				sea[line.start.y][index] = current + 1;
			}
		} else if (
			line.start.y !== line.finish.y &&
			line.start.x === line.finish.x
		) {
			// V
			const lowestPoint = Math.min(line.start.y, line.finish.y);
			const value = Math.abs(line.start.y - line.finish.y);

			for (
				let index = lowestPoint;
				index <= value + lowestPoint;
				index++
			) {
				const current = sea[index][line.start.x] || 0;
				if (current === 1) {
					overlapCount++;
				}
				sea[index][line.start.x] = current + 1;
			}
		} else {
			//
		}
	});
	return overlapCount;
}
console.log("Solution 1: ", partOne());
// sea.map((i) => console.log(i.join("").toString()));
