import Code from "components/Code";

export default function QuickStartContent() {
    return (
        <>
            <h1>Quick Start</h1>
            <p>
                Below is a simple example that demonstrates how to create a new
                chess game, make moves, undo moves, and query the game state.
                The library handles all move validation, game rules, and state
                management automatically.
            </p>
            <Code
                language="typescript"
                code={`import { Chesster } from "chesster.js";

// Create a new game
const game = new Chesster();

// Get all legal moves
const moves = game.moves();

// Make a move
game.move(moves[0]);

// Undo a move
game.undo();

// Check if game is over
if (game.isGameOver()) {
    console.log("gg");
}`}
            />
        </>
    );
}
