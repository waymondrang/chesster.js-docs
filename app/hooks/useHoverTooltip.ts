"use client";

import { useTooltip } from "context/TooltipProvider";
import { ReactNode, useCallback } from "react";

interface UseHoverTooltipProps {
    content?: string | ReactNode;
}

interface UseHoverTooltipReturn {
    onMouseEnter: (event: React.MouseEvent) => void;
    onMouseLeave: () => void;
    onMouseMove: (event: React.MouseEvent) => void;
}

// todo: update tooltip content when content changes on active element

/**
 * custom hooks for implementing tooltip behavior
 */
function useTooltipHooks({
    content,
}: UseHoverTooltipProps = {}): UseHoverTooltipReturn {
    const { showTooltip, hideTooltip, updateTooltip } = useTooltip();

    const handleMouseEnter = useCallback(
        (event: React.MouseEvent) => {
            showTooltip(event, content);
        },
        [content, showTooltip]
    );

    const handleMouseLeave = useCallback(() => {
        hideTooltip();
    }, [hideTooltip]);

    const handleMouseMove = useCallback(
        (event: React.MouseEvent) => {
            updateTooltip(event);
        },
        [updateTooltip]
    );

    return {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseMove: handleMouseMove,
    };
}

export { useTooltipHooks };
