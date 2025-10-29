import { Chesster, WHITE } from "chesster.js";
import { describe, test } from "@jest/globals";

const TEST_TIMEOUT = 10000;

describe("examples tests", () => {
    test(
        `random move player example`,
        () => {
            function getRandomMove(game) {
                const moves = game.moves();
                return moves[Math.floor(Math.random() * moves.length)];
            }

            function playRandomGame() {
                const game = new Chesster();
                let moveCount = 0;

                while (!game.isGameOver()) {
                    const move = getRandomMove(game);
                    game.move(move);

                    moveCount++;
                }

                console.log(`game ended after ${moveCount} moves`);

                if (game.white.isCheckmated || game.black.isCheckmated) {
                    const winner = game.turn === WHITE ? "black" : "white";
                    console.log(`checkmate: ${winner} wins!`);
                } else if (game.isStalemate) {
                    console.log("draw: stalemate");
                } else if (game.isDraw) {
                    console.log("draw");
                }

                return game;
            }

            // Play a random game
            playRandomGame();
        },
        TEST_TIMEOUT
    );
});
