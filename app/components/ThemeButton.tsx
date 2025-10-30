"use client";

import { useTheme } from "context/ThemeProvider";
import { useTooltipHooks } from "hooks/useHoverTooltip";

export default function ThemeButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            {...useTooltipHooks({
                customContent:
                    theme === "system"
                        ? "System"
                        : theme === "dark"
                          ? "Dark mode"
                          : "Light mode",
            })}
            onClick={toggleTheme}
            className="squareButton"
        >
            <span className="material-symbols-outlined symbol">
                {theme &&
                    (theme === "system"
                        ? "routine"
                        : theme === "dark"
                          ? "dark_mode"
                          : "light_mode")}
            </span>
        </button>
    );
}
