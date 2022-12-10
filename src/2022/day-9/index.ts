import { nextLineParseString } from "../../util/parse";
import { input as rawInput } from "./data";

const input = nextLineParseString(rawInput).map((i) => {
	const [direction, value] = i.split(" ");
	return { direction, value: parseInt(value) };
});

let hx = 0;
let hy = 0;
let tx = 0;
let ty = 0;

export const isTouching = (x1: number, y1: number, x2: number, y2: number) => {
	return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1;
};

const move = (x: number, y: number, index: number) => {
	hx += x;
	hy += y;
	if (index === 0) {
		return;
	}
	if (isTouching(hx, hy, tx, ty)) {
		console.log("is touching", "Hx", hx, "Hy", hy, "Tx", tx, "Ty", ty);
		return;
	}

	let signX = hx === tx ? 0 : (hx - tx) / Math.abs(hx - tx);
	let signY = hy === ty ? 0 : (hy - ty) / Math.abs(hy - ty);

	tx += signX;
	ty += signY;

	console.log("Hx", hx, "Hy", hy, "Tx", tx, "Ty", ty);
};

const visited: number[][] = [];

function solutionOne() {
	input.forEach((line, lineIndex) => {
		const { direction, value } = line;
		let dx = 0;
		let dy = 0;
		if (direction === "U") {
			dx = 0;
			dy = 1;
		} else if (direction === "D") {
			dx = 0;
			dy = -1;
		} else if (direction === "R") {
			dx = 1;
			dy = 0;
		} else if (direction === "L") {
			dx = -1;
			dy = 0;
		} else {
			throw new Error("Invalid direction: " + direction);
		}

		for (let index = 0; index < value; index++) {
			console.log(line, index);
			move(dx, dy, lineIndex);
			const exists = visited.find((i) => i[0] === tx && i[1] === ty);
			if (!exists) {
				visited.push([tx, ty]);
			}
		}
	});
	return visited.length;
}

console.log("Solution 1: ", solutionOne());
