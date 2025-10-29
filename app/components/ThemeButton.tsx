"use client";

import { useTheme } from "context/ThemeProvider";
import { useTooltipHooks } from "hooks/useHoverTooltip";

export default function ThemeButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            {...useTooltipHooks({
                content: "Toggle themes",
            })}
            onClick={toggleTheme}
            className="squareButton"
        >
            <span className="material-symbols-outlined symbol">
                {theme === "system"
                    ? "routine"
                    : theme === "dark"
                      ? "dark_mode"
                      : "light_mode"}
            </span>
        </button>
    );
}
