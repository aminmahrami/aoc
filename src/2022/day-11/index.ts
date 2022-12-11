import {
	nextLineParseString,
	stringToNumber,
	twoNextLinesParseString,
} from "../../util/parse";
import { input as rawInput } from "./data";

const monkeyStack = new Map<number, number[]>();

const input = twoNextLinesParseString(rawInput).map((monkey) => {
	const story = nextLineParseString(monkey);
	const monkeyNumber = parseInt(story[0].split(" ").getLast() || "");
	const startingItems = story[1]
		.replace("Starting items: ", "")
		.split(",")
		.map(stringToNumber);
	const [operationOperator, operationY] = story[2].split(" ").slice(-2);
	const divisibleDivider = parseInt(story[3].split(" ").pop() || "");
	const nextMonkeyIfTrue = parseInt(story[4].split(" ").pop() || "");
	const nextMonkeyIfFalse = parseInt(story[5].split(" ").pop() || "");

	monkeyStack.set(monkeyNumber, startingItems);

	return {
		monkeyNumber,
		operationOperator,
		operationY,
		divisibleDivider,
		nextMonkeyIfTrue,
		nextMonkeyIfFalse,
		_startingItems: monkeyStack.get(monkeyNumber),
	};
});

const addToStack = (monkeyNumber: number, value: number) => {
	const current = monkeyStack.get(monkeyNumber) || [];
	monkeyStack.set(monkeyNumber, [...current, value]);
};

const monkeyHistory = new Map<number, number>();

for (let round = 0; round < 20; round++) {
	for (let index = 0; index < input.length; index++) {
		const story = input[index];
		const startingItems = monkeyStack.get(story.monkeyNumber);
		if (!startingItems) {
			throw new Error("monkey stack is undefined");
		}

		for (
			let itemsIndex = 0;
			itemsIndex < startingItems.length;
			itemsIndex++
		) {
			// Keep track of each time this monkey has inspected an item
			const currentHistory = monkeyHistory.get(story.monkeyNumber) || 0;
			monkeyHistory.set(story.monkeyNumber, currentHistory + 1);

			const item = startingItems[itemsIndex];
			const worryLevelDuringInspection =
				story.operationOperator === "*"
					? item *
					  (isNaN(parseInt(story.operationY))
							? item
							: parseInt(story.operationY))
					: item +
					  (isNaN(parseInt(story.operationY))
							? item
							: parseInt(story.operationY));
			const worryLevelAfterInspection = Math.floor(
				worryLevelDuringInspection / 3
			);
			if (worryLevelAfterInspection % story.divisibleDivider === 0) {
				addToStack(story.nextMonkeyIfTrue, worryLevelAfterInspection);
			} else {
				addToStack(story.nextMonkeyIfFalse, worryLevelAfterInspection);
			}
		}
		monkeyStack.set(story.monkeyNumber, []);
	}
}
console.log(
	"Solution 1: ",
	[...monkeyHistory.values()].sortDesc().slice(0, 2).multiply()
);
