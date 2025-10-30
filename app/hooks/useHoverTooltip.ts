"use client";

import { useTooltip } from "context/TooltipProvider";
import { useEffect } from "react";

interface UseHoverTooltipProps {
    customContent?: string | React.ReactNode | null;
}

interface UseHoverTooltipReturn {
    onMouseEnter: (event: React.MouseEvent) => void;
    onMouseLeave: () => void;
    onMouseMove: (event: React.MouseEvent) => void;
}

/**
 * custom hooks for implementing tooltip behavior
 */
function useTooltipHooks({
    customContent,
}: UseHoverTooltipProps = {}): UseHoverTooltipReturn {
    const { setTooltipTarget, updateTooltipPosition, setTooltipContent } =
        useTooltip();

    // update tooltip content whenever custom content changes
    useEffect(() => {
        setTooltipContent(customContent);
    }, [customContent, setTooltipContent]);

    const handleMouseEnter = (event: React.MouseEvent) => {
        setTooltipTarget(event.currentTarget);
        setTooltipContent(customContent);
    };

    const handleMouseLeave = () => {
        setTooltipTarget(null);
        setTooltipContent(null);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        updateTooltipPosition(event);
    };

    return {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseMove: handleMouseMove,
    };
}

export { useTooltipHooks };
