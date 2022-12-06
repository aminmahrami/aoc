import { stringToNumber } from "../../util/parse";
import { drawnNumbers as _drawnNumbers, boards as _boards } from "./data";

const drawnNumbers = _drawnNumbers.split(",").map(stringToNumber);
let boards = _boards
  .trim()
  .split("\n\n")
  .map((i) => i.split("\n").map((j) => j.split(" ").filter(Boolean)));

function solutionOne() {
  let winnerBoards: {
    board: string[][];
    winnerNumber: number;
    boardIndex: number;
  }[] = [];

  for (
    let drawnNumberIndex = 0;
    drawnNumberIndex < drawnNumbers.length;
    drawnNumberIndex++
  ) {
    const drawnNumber = drawnNumbers[drawnNumberIndex];

    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      const board = boards[boardIndex];
      if (winnerBoards.find((i) => i.boardIndex === boardIndex)) {
        continue;
      }

      let boardIsWinner = false;

      for (
        let boardRowIndex = 0;
        boardRowIndex < board.length;
        boardRowIndex++
      ) {
        const row = board[boardRowIndex];
        if (boardIsWinner) {
          break;
        }

        for (let itemIndex = 0; itemIndex < row.length; itemIndex++) {
          let item = row[itemIndex];
          if (parseInt(item) === drawnNumber) {
            item = `**${item}`;
          }
          row[itemIndex] = item;
          board[boardRowIndex] = row;

          // Check is winner horizontally
          if (row.filter((i) => i.includes("**")).length === 5) {
            winnerBoards.push({
              board: board,
              winnerNumber: drawnNumber,
              boardIndex,
            });
            boardIsWinner = true;
            break;
          } else {
            // Check is winner vertically
            let columnMarkedCount = 0;
            for (let _index = 0; _index < 5; _index++) {
              if (columnMarkedCount === 5) {
                break;
              }
              columnMarkedCount = 0;
              const indexToCheck = _index;
              board.forEach((r) => {
                if (r[indexToCheck].includes("**")) {
                  columnMarkedCount++;
                }
              });
            }
            if (columnMarkedCount === 5) {
              winnerBoards.push({
                board: board,
                winnerNumber: drawnNumber,
                boardIndex,
              });
              boardIsWinner = true;
              break;
            }
          }
        }
      }
    }
  }
  return winnerBoards;
}

const solutionOneRes = solutionOne();
const firstWinner = solutionOneRes[0];
const lastWinner = solutionOneRes.pop();
if (!lastWinner) {
  throw new Error("unexpected");
}

const getUnmarkedSum = (board: string[][]) =>
  board.reduce(
    (rowTotal, row) =>
      rowTotal +
      row
        .filter((i) => !i.includes("**"))
        .map(stringToNumber)
        .sum(),
    0
  );

console.log(
  "Solution 1: ",
  getUnmarkedSum(firstWinner.board) * firstWinner.winnerNumber
);
console.log(
  "Solution 2: ",
  getUnmarkedSum(lastWinner.board) * lastWinner.winnerNumber
);
