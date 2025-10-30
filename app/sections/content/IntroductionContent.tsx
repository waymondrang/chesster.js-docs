import Callout from "components/Callout";

export default function IntroductionContent() {
    return (
        <>
            <h1>Introduction</h1>
            <p id="bio">
                chesster.js is a dependency-free TypeScript chess library
                focused on performance and accuracy. It provides a complete
                implementation of chess rules, move validation and game state
                management.
            </p>
            <Callout type="note" title="Still developing our pieces">
                chesster.js (and this documentation site) is currently under
                construction. Please note that there may be incomplete features
                and breaking changes while improvements are being made.
            </Callout>
        </>
    );
}
