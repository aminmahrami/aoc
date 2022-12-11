import { parsedInput as input } from "./data";

const calculateResult = (arr: number[]) =>
	arr.sortDesc().slice(0, 2).multiply();

function turnAround(numRounds: number) {
	const monkeyHistory = new Map<number, number>();
	const monkeyStack = new Map<number, number[]>();

	// I learned this today
	let mod = 1;
	for (let i = 0; i < input.length; i++) {
		mod *= input[i].divisibleDivider;
	}

	input.forEach((i) => monkeyStack.set(i.monkeyNumber, i.startingItems)); // Construct starting items

	const addToStack = (monkeyNumber: number, value: number) => {
		const current = monkeyStack.get(monkeyNumber) || [];
		monkeyStack.set(monkeyNumber, [...current, value]);
	};

	for (let round = 0; round < numRounds; round++) {
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
				const currentHistory =
					monkeyHistory.get(story.monkeyNumber) || 0;
				monkeyHistory.set(story.monkeyNumber, currentHistory + 1);

				const item = startingItems[itemsIndex];
				const opYNumberOrNaN = parseInt(story.operationY);
				const worryLevelDuringInspection =
					story.operationOperator === "*"
						? item * (isNaN(opYNumberOrNaN) ? item : opYNumberOrNaN)
						: item +
						  (isNaN(opYNumberOrNaN) ? item : opYNumberOrNaN);
				const muchSmallerWorry = worryLevelDuringInspection % mod;

				addToStack(
					muchSmallerWorry % story.divisibleDivider === 0
						? story.nextMonkeyIfTrue
						: story.nextMonkeyIfFalse,
					muchSmallerWorry
				);
			}
			monkeyStack.set(story.monkeyNumber, []);
		}
	}
	return calculateResult([...monkeyHistory.values()]);
}

console.log("Solution 1: ", turnAround(20));
console.log("Solution 2: ", turnAround(10000));
