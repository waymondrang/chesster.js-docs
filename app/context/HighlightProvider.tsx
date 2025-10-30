"use client";

import { createContext, useContext, useState } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import html from "highlight.js/lib/languages/xml";

interface HighlightContextType {
    hljs: typeof hljs;
}

interface HighlightProviderProps {
    children: React.ReactNode;
}

const HighlightContext = createContext<HighlightContextType | null>(null);

function HighlightProvider({ children }: HighlightProviderProps) {
    const [hljsInstance] = useState<typeof hljs>(() => {
        ////////////////////////
        // REGISTER LANGUAGES //
        ////////////////////////

        hljs.registerLanguage("javascript", javascript);
        hljs.registerLanguage("typescript", typescript);
        hljs.registerLanguage("bash", bash);
        hljs.registerLanguage("html", html);

        return hljs;
    });

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
