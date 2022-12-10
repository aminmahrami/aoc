import { nextLineParseString } from "../../util/parse";
import { input as rawInput } from "./data";

const input = nextLineParseString(rawInput).map((i) => {
	const [instruction, value] = i.split(" ");
	return { instruction, value: parseInt(value ?? 0) };
});

let result = 0;
let cycle = 0;
let signalStrength = 1;
let monitor: string[][] = [];

for (let i = 0; i < 6; i++) {
	const row = [];
	for (let j = 0; j < 40; j++) {
		row.push(" ");
	}
	monitor.push(row);
}

function incrementResultIfNeeded() {
	if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
		result += cycle * signalStrength;
	}
}

function drawIfNeeded() {
	const CRTPosition = cycle % 40;
	if (
		[signalStrength - 1, signalStrength, signalStrength + 1].includes(
			CRTPosition
		)
	) {
		monitor[Math.floor(cycle / 40)][CRTPosition] = "#";
	}
}

input.forEach((line) => {
	drawIfNeeded();
	cycle++;
	const { instruction, value } = line;
	switch (instruction) {
		case "noop":
			incrementResultIfNeeded();
			break;
		case "addx":
			drawIfNeeded();
			incrementResultIfNeeded();
			cycle++;
			incrementResultIfNeeded();
			signalStrength += value;
			break;
		default:
			break;
	}
});

console.log("Solution 1: ", result); // 13180
monitor.map((i) => console.log(i.join("").toString()));
// #### #### ####  ##  #  #   ##  ##  ###
// #       # #    #  # #  #    # #  # #  #
// ###    #  ###  #    ####    # #  # ###
// #     #   #    #    #  #    # #### #  #
// #    #    #    #  # #  # #  # #  # #  #
// #### #### #     ##  #  #  ##  #  # ###
