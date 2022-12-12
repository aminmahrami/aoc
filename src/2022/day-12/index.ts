import { nextLineParseString } from "../../util/parse";
import { input as rawInput } from "./data";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Graph = require("node-dijkstra");

const route = new Graph();
let start = "";
let finish = "";

const getHeight = (v: string) =>
	v === "start" || v === "finish"
		? 1
		: "abcdefghijklmnopqrstuvwxyz".indexOf(v) + 2;
const getNodeName = (
	item: string,
	itemIndex: number,
	rowIndex: number,
	rowLength: number
) => {
	const ret = `${itemIndex + rowLength * rowIndex}`;

	if (item === "S") {
		item = "a";
		start = ret;
	} else if (item === "E") {
		item = "z";
		finish = ret;
	}
	return ret;
};

const grid: string[][] = [];
const stringNumberGrid: string[][] = [];

function solutionOne() {
	nextLineParseString(rawInput).forEach((line, lineIndex) => {
		line.split("").forEach((rockHeight) => {
			grid[lineIndex] = [...(grid[lineIndex] || []), rockHeight];
		});
	});

	grid.forEach((row, rowIndex) => {
		row.forEach((item, itemIndex) => {
			const nodeName = getNodeName(item, itemIndex, rowIndex, row.length);
			const cost = getHeight(item);
			stringNumberGrid[rowIndex] = [
				...(stringNumberGrid[rowIndex] || []),
				nodeName,
			];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const neighbors = {} as unknown as any;
			if (itemIndex !== 0) {
				const _cost = getHeight(row[itemIndex - 1]);
				if (Math.abs(_cost - cost) <= 1) {
					neighbors[
						getNodeName(item, itemIndex - 1, rowIndex, row.length)
					] = _cost;
				}
			}

			if (itemIndex !== row.length - 1) {
				const _cost = getHeight(row[itemIndex + 1]);
				if (Math.abs(_cost - cost) <= 1) {
					neighbors[
						getNodeName(item, itemIndex + 1, rowIndex, row.length)
					] = _cost;
				}
			}

			if (rowIndex !== 0) {
				const _cost = getHeight(row[itemIndex - 1]);
				if (Math.abs(_cost - cost) <= 1) {
					neighbors[
						getNodeName(item, itemIndex, rowIndex - 1, row.length)
					] = _cost;
				}
			}

			if (rowIndex !== grid.length - 1) {
				const _cost = getHeight(row[itemIndex + 1]);
				if (Math.abs(_cost - cost) <= 1) {
					neighbors[
						getNodeName(item, itemIndex, rowIndex + 1, row.length)
					] = _cost;
				}
			}

			route.addNode(nodeName, neighbors);
		});
	});

	return route.path(start, finish).length as string[];
}

console.log("Solution 1: ", solutionOne());
