import { nextLineParseString } from "../../util/parse";
import { input as rawInput } from "./data";

const input = nextLineParseString(rawInput).map((i) => {
	const [instruction, value] = i.split(" ");
	return { instruction, value: parseInt(value ?? 0) };
});

function solutionOne() {
	let result = 0;
	let cycle = 0;
	let signalStrength = 1;

	function incrementResultIfNeeded() {
		if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
			result += cycle * signalStrength;
		}
	}

	input.forEach((line) => {
		cycle++;
		const { instruction, value } = line;
		switch (instruction) {
			case "noop":
				incrementResultIfNeeded();
				break;
			case "addx":
				incrementResultIfNeeded();
				cycle++;
				incrementResultIfNeeded();
				signalStrength += value;
				break;
			default:
				break;
		}
	});

	return result;
}

console.log("Solution 1: ", solutionOne()); // 13180
