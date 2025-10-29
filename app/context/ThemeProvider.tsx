"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "theme";

declare global {
    interface Window {
        __THEME__?: {
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
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(null);

    // Get system preference
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
        setResolvedTheme(resolved);
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

    useEffect(() => {
        const initData = window.__THEME__;
        setTheme(initData.theme);
        setResolvedTheme(initData.resolvedTheme);

        // no need to apply theme here, it was already done by script.
    }, []);

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
