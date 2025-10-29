import { Chesster, fenToGameState } from "chesster.js";
import { describe } from "@jest/globals";

describe("basic guide tests", () => {
    test("create game example", () => {
        // Standard starting position
        const game = new Chesster();

        // Custom position
        const puzzle = new Chesster(
            fenToGameState(
                "3N2r1/2k5/p2b1pp1/1R2P3/7K/1r5P/2n3P1/2B1N3 w - - 0 1"
            )
        );
    });
});
