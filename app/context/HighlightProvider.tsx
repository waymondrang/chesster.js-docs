"use client";

import { createContext, useContext, useEffect, useState } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import html from "highlight.js/lib/languages/xml";

interface HighlightContextType {
    hljs: typeof hljs | null;
}

const HighlightContext = createContext<HighlightContextType>({ hljs: null });

function HighlightProvider({ children }: { children: React.ReactNode }) {
    const [hljsInstance, setHljsInstance] = useState<typeof hljs | null>(null);

    useEffect(() => {
        ////////////////////////
        // REGISTER LANGUAGES //
        ////////////////////////

        hljs.registerLanguage("javascript", javascript);
        hljs.registerLanguage("typescript", typescript);
        hljs.registerLanguage("bash", bash);
        hljs.registerLanguage("html", html);

        setHljsInstance(hljs);
    }, []);

    return (
        <HighlightContext.Provider value={{ hljs: hljsInstance }}>
            {children}
        </HighlightContext.Provider>
    );
}

function useHighlight() {
    const context = useContext(HighlightContext);

    if (!context) {
        throw new Error("useHighlight must be used within a HighlightProvider");
    }

    return context;
}

export { HighlightProvider, useHighlight };
