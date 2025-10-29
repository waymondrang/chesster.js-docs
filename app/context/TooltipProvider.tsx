"use client";

import {
    createContext,
    useContext,
    useRef,
    useState,
    ReactNode,
} from "react";
import { jxc } from "utilities";

interface TooltipPosition {
    x: number;
    y: number;
}

// todo: decouple tooltip logic from this logic (just responsible for showing and positioning tooltip)

interface TooltipContextType {
    showTooltip: {
        (event: React.MouseEvent, content?: string | ReactNode): void;
    };
    hideTooltip: () => void;
    updateTooltip: (event: React.MouseEvent) => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

interface TooltipProviderProps {
    children: ReactNode;
}

function TooltipProvider({ children }: TooltipProviderProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState<ReactNode>("");
    const [position, setPosition] = useState<TooltipPosition>({ x: 0, y: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const targetElementRef = useRef<HTMLElement | null>(null);
    const touchingRef = useRef(false);

    const isExternalLink = (url: string): boolean => {
        try {
            const linkUrl = new URL(url, window.location.href);
            return linkUrl.hostname !== window.location.hostname;
        } catch {
            return false;
        }
    };

    const createContentNodeFromEvent = (event: React.MouseEvent): ReactNode => {
        // note: currently only supports elements with href attribute

        const tagName = event.currentTarget.tagName.toLowerCase();

        if (tagName == "a") {
            const href = event.currentTarget.getAttribute("href");
            if (!href) {
                return (
                    <div className="content">
                        <span>href not found</span>
                    </div>
                );
            }

            const isExternal = isExternalLink(href);

            return (
                <div className="content">
                    <span>{href}</span>

                    {/* show arrow when link is external */}
                    {isExternal && (
                        <span className="material-symbols-outlined">
                            arrow_outward
                        </span>
                    )}
                </div>
            );
        } else {
            console.warn(
                "attempted to create content node from unsupported element"
            );
        }
    };

    const showTooltip = (
        event: React.MouseEvent,
        content?: string | ReactNode
    ): void => {
        let contentNode: ReactNode;

        if (content === undefined) {
            contentNode = createContentNodeFromEvent(event);
        } else if (typeof content === "string") {
            contentNode = (
                <div className="content">
                    <span>{content}</span>
                </div>
            );
        } else if (content) {
            contentNode = content;
        }

        if (!contentNode) return;

        setContent(contentNode);
        updateTooltip(event);

        setIsVisible(true);
    };

    const hideTooltip = (): void => {
        setIsVisible(false);
        targetElementRef.current = null;
        touchingRef.current = false;
    };

    const updateTooltip = (event: React.MouseEvent): void => {
        if (!tooltipRef.current) {
            return;
        }

        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
            if (!tooltipRef.current) {
                return;
            }

            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const padding = 10;

            let x = event.clientX + padding;
            let y = event.clientY - tooltipRect.height - padding;

            // Display tooltip on left of mouse if overflowing
            if (x + tooltipRect.width + padding > window.innerWidth) {
                x = event.clientX - tooltipRect.width - padding;
            }

            // If still overflowing, display as left as possible
            if (x < 0) {
                x = padding;
            }

            // Display tooltip beneath mouse if overflowing or if target has bottom class
            const targetElement = targetElementRef.current;
            if (y < 0 || targetElement?.classList.contains("hoverTipBottom")) {
                y = event.clientY + padding;
            }

            setPosition({ x, y });
        });
    };

    return (
        <TooltipContext.Provider
            value={{ showTooltip, hideTooltip, updateTooltip }}
        >
            {children}

            <div
                ref={tooltipRef}
                className={jxc(isVisible && "visible")}
                id="hoverTooltip"
                style={{
                    position: "fixed",
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    pointerEvents: "none",
                    zIndex: 9999,
                }}
            >
                {content}
            </div>
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
