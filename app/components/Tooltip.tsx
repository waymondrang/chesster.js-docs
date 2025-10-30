import { Ref } from "react";
import { isExternalLink } from "utilities";

interface TooltipProps {
    ref: Ref<HTMLDivElement>;
    target: Element | null;
    customContent: string | React.ReactNode;
}

export default function Tooltip({ ref, target, customContent }: TooltipProps) {
    const generateContentFromLink = (element: HTMLAnchorElement) => {
        const link = element.getAttribute("href");

        if (!link) {
            return <div className="content"></div>;
        }

        return (
            <div className="content">
                <span>{element.getAttribute("href")}</span>

                {isExternalLink(link) && (
                    <span className="material-symbols-outlined">
                        arrow_outward
                    </span>
                )}
            </div>
        );
    };

    const generateContentFromElement = (
        element: Element | null
    ): React.ReactNode => {
        if (!element) return;

        // determine which type of element target is
        switch (element.tagName) {
            case "A":
                return generateContentFromLink(element as HTMLAnchorElement);
            default:
                return (
                    <div className="content">
                        <span className="material-symbols-outlined">error</span>
                        <span>Could not generate tooltip</span>
                    </div>
                );
        }
    };

    const generateContent = (): React.ReactNode => {
        if (customContent == null) {
            return generateContentFromElement(target);
        } else {
            if (typeof customContent === "string") {
                return (
                    <div className="content">
                        <span>{customContent}</span>
                    </div>
                );
            } else {
                return customContent;
            }
        }
    };

    return (
        <>
            {target != null && (
                <div ref={ref} id="hoverTooltip">
                    {generateContent()}
                </div>
            )}
        </>
    );
}
