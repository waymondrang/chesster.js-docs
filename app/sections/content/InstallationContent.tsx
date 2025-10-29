import Code from "components/Code";

export default function InstallationContent() {
    return (
        <>
            <h1>Installation</h1>
            <p>
                Install the <code>chesster.js</code> package using your
                preferred package manager.
            </p>

            <h2>Using npm</h2>
            <Code language="bash" code="npm install chesster.js" />

            <h2>Using yarn</h2>
            <Code language="bash" code="yarn add chesster.js" />
        </>
    );
}
