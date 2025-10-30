"use client";

import Tooltip from "components/Tooltip";
import {
    createContext,
    useContext,
    useRef,
    useState,
    useLayoutEffect,
} from "react";

const TOOLTIP_DISTANCE = 10;

interface Position {
    x: number;
    y: number;
}

interface TooltipContextType {
    setTooltipTarget: (target: Element | null) => void;
    updateTooltipPosition: (event: React.MouseEvent) => void;
    setTooltipContent: (content: string | React.ReactNode | null) => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

interface TooltipProviderProps {
    children: React.ReactNode;
}

function TooltipProvider({ children }: TooltipProviderProps) {
    const [target, setTarget] = useState<Element | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [clientPosition, setClientPosition] = useState<Position>({
        x: 0,
        y: 0,
    });
    const [customContent, setCustomContent] = useState<
        string | React.ReactNode | null
    >(null);

    const calculatePosition = (position: Position): Position => {
        if (!tooltipRef.current) {
            return position;
        }

        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        let x = position.x + TOOLTIP_DISTANCE;
        let y = position.y - tooltipRect.height - TOOLTIP_DISTANCE;

        if (x + tooltipRect.width + TOOLTIP_DISTANCE > window.innerWidth) {
            x = position.x - tooltipRect.width - TOOLTIP_DISTANCE;
        }

        if (x < TOOLTIP_DISTANCE) {
            x = TOOLTIP_DISTANCE;
        }

        if (y < TOOLTIP_DISTANCE) {
            y = position.y + TOOLTIP_DISTANCE;
        }

        // TODO: add options to update tooltip such as (below, above, padding, etc.
        // these parameters can be configured per tooltip)

        return { x, y };
    };

    const updateTooltipPosition = (event: React.MouseEvent): void => {
        setClientPosition({ x: event.clientX, y: event.clientY });
    };

    // update tooltip position using uselayout to calculate positions accurately
    useLayoutEffect(() => {
        if (target && tooltipRef.current) {
            const newPosition = calculatePosition(clientPosition);

            // directly update position to avoid cascading render warning
            tooltipRef.current.style.left = `${newPosition.x}px`;
            tooltipRef.current.style.top = `${newPosition.y}px`;
        }
    }, [target, clientPosition]);

    return (
        <TooltipContext.Provider
            value={{
                setTooltipTarget: setTarget,
                updateTooltipPosition,
                setTooltipContent: setCustomContent,
            }}
        >
            {children}

            <Tooltip
                ref={tooltipRef}
                target={target}
                customContent={customContent}
            />
        </TooltipContext.Provider>
    );
}

function useTooltip() {
    const context = useContext(TooltipContext);

    if (!context) {
        throw new Error("useTooltip must be used within a TooltipProvider");
    }

    return context;
}

export { TooltipProvider, useTooltip };
