import Code from "components/Code";
import Callout from "components/Callout";

export default function ExamplesContent() {
    return (
        <>
            <h1>Examples</h1>
            <p>
                Complete examples to help you get started building chess
                applications with chesster.js.
            </p>

            <h2>Simple Game Loop</h2>
            <p>
                A basic game loop that plays through a predefined sequence of
                moves.
            </p>

            <Code language="javascript" code={`// coming soon`} />

            <h2>Random Moves</h2>
            <p>
                Simulate a game where the players make random legal moves until
                the game ends.
            </p>

            <Code
                language="javascript"
                code={`for (let i = 0; i < NUM_GAMES; i++) {
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

        console.log(\`game ended after \${moveCount} moves\`);

        if (game.white.isCheckmated || game.black.isCheckmated) {
            const winner = game.turn === WHITE ? "black" : "white";
            console.log(\`checkmate: \${winner} wins!\`);
        } else if (game.isStalemate) {
            console.log("draw: stalemate");
        } else if (game.isDraw) {
            console.log("draw");
        }

        return game;
    }

    // Play a random game
    playRandomGame();
}`}
            />

            <Callout type="note" title="Under Construction">
                This section is still being developed.
            </Callout>
        </>
    );
}
