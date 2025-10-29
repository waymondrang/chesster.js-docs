import Callout from "components/Callout";
import Code from "components/Code";

export default function ChessterReference() {
    return (
        <>
            <h1>Chesster</h1>
            <p>
                The Chesster class is the main entry point for managing chess
                games. It handles move validation, game state, and provides
                methods for querying the current position.
            </p>

            <h2>FEN String Constructor</h2>
            <Code language="typescript" code={`new Chesster(fen?: string)`} />

            <p>
                Creates a new chess game instance. Optionally accepts a FEN
                string to initialize a specific board position.
            </p>

            <h3>Parameters</h3>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <code>fen</code>
                            </td>
                            <td>
                                <code>string?</code>
                            </td>
                            <td>Optional FEN string</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Example</h3>
            <Code
                language="javascript"
                code={`// Create a new game with starting position
const game = new Chess();

// Create from custom FEN (also starting position)
const customGame = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');`}
            />

            <h2>Game State Constructor</h2>
            <Code
                language="typescript"
                code={`new Chesster(gameState?: RecursivePartial<GameState>)`}
            />

            <p>
                Creates a new chess game instance. Optionally accepts a partial
                game state to initialize a specific game position.
            </p>

            <h3>Parameters</h3>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <code>gameString</code>
                            </td>
                            <td>
                                <code>RecursivePartial&lt;GameState&gt;?</code>
                            </td>
                            <td>Optional GameState object</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Example</h3>
            <Code language="javascript" code={`// Coming soon`} />
        </>
    );
}
