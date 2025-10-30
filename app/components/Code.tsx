"use client";

import { useEffect, useRef } from "react";
import { useHighlight } from "context/HighlightProvider";

function Code({ language, code }: { language: string; code: string }) {
    const { hljs } = useHighlight();
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (hljs && codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [hljs, code, language]);

    return (
        <pre>
            <code ref={codeRef} className={`language-${language}`}>
                {code}
            </code>
        </pre>
    );
}

export default Code;
