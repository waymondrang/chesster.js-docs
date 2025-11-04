"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initDarkMode } from "../src/init_dark_mode";

type UnresolvedTheme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
    theme: UnresolvedTheme | undefined;
    toggleTheme: () => void;
}

interface ThemeContextProps {
    children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function ThemeProvider({ children }: ThemeContextProps) {
    const [unresolvedTheme, setUnresolvedTheme] = useState<
        UnresolvedTheme | undefined
    >(undefined);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUnresolvedTheme(() => getUnresolvedTheme());
    }, []);

    const updateTheme = (newTheme: UnresolvedTheme) => {
        setUnresolvedTheme(newTheme);

        try {
            localStorage.setItem("theme", newTheme);
        } catch {
            // ignore
        }

        const resolved = resolveTheme(newTheme);
        applyTheme(resolved);
    };

    const toggleTheme = () => {
        let newTheme: UnresolvedTheme;

        switch (unresolvedTheme) {
            case "light":
                newTheme = "dark";
                break;
            case "dark":
                newTheme = "system";
                break;
            case "system":
            default:
                newTheme = "light";
                break;
        }

        updateTheme(newTheme);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme: unresolvedTheme,
                toggleTheme,
            }}
        >
            <script
                suppressHydrationWarning={true}
                dangerouslySetInnerHTML={{
                    __html: `(${initDarkMode.toString()})()`,
                }}
            />

            {children}
        </ThemeContext.Provider>
    );
}

///////////////////////
// UTILITY FUNCTIONS //
///////////////////////

const getUnresolvedTheme = (): UnresolvedTheme | undefined => {
    if (typeof window === "undefined") {
        return undefined;
    }

    return getSavedTheme() || "system";
};

const getSavedTheme = (): UnresolvedTheme | null => {
    try {
        return localStorage.getItem("theme") as UnresolvedTheme | null;
    } catch {
        return null;
    }
};

const getSystemTheme = (): ResolvedTheme => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const resolveTheme = (theme: UnresolvedTheme): ResolvedTheme => {
    if (theme === "system") {
        return getSystemTheme();
    }

    return theme;
};

const applyTheme = (theme: ResolvedTheme) => {
    if (theme === "dark") {
        document.documentElement.classList.add("dark_mode");
    } else {
        document.documentElement.classList.remove("dark_mode");
    }
};

function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}

export { ThemeProvider, useTheme };
