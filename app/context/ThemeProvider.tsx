"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const THEME_STORAGE_KEY = "theme";
type Theme = "light" | "dark" | "system";

declare global {
    interface Window {
        __THEME__: {
            theme: Theme;
            resolvedTheme: "light" | "dark";
        };
    }
}

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}) {
    const [theme, setTheme] = useState<Theme>(null);

    React.useLayoutEffect(() => {
        if (typeof window !== "undefined" && window.__THEME__) {
            setTheme(() => window.__THEME__.theme);
        }
    }, []);

    // get system preference
    const getSystemTheme = (): "light" | "dark" => {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };

    const resolveTheme = (currentTheme: Theme): "light" | "dark" => {
        if (currentTheme === "system") {
            return getSystemTheme();
        }

        return currentTheme;
    };

    const applyTheme = (resolvedTheme: "light" | "dark") => {
        if (resolvedTheme === "dark") {
            document.documentElement.classList.add("dark_mode");
        } else {
            document.documentElement.classList.remove("dark_mode");
        }
    };

    const updateTheme = (newTheme: Theme) => {
        setTheme(newTheme);

        // todo: verify that we do not need to check window or document
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);

        const resolved = resolveTheme(newTheme);
        applyTheme(resolved);
    };

    const toggleTheme = () => {
        let newTheme: Theme;

        switch (theme) {
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
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}

export { ThemeProvider, useTheme };
