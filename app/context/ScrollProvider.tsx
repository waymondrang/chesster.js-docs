"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { sections } from "sections/config";
import { convertRemToPx, isMobileLayout } from "utilities";

const SPY_OFFSET = 200;
const SCROLL_OFFSET = "2rem";
const MOBILE_SCROLL_OFFSET = "3rem";

interface ScrollContextType {
    currentSection: string | null;
    registerSection: (sectionId: string, element: HTMLElement) => void;
    unregisterSection: (sectionId: string) => void;
    scrollToSection: (sectionId: string) => void;
}

interface ScrollProviderProps {
    children: React.ReactNode;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

function ScrollProvider({ children }: ScrollProviderProps) {
    const [currentSection, setCurrentSection] = useState<string | null>(null);
    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

    const registerSection = useCallback(
        (sectionId: string, element: HTMLElement) => {
            sectionRefs.current.set(sectionId, element);
        },
        []
    );

    const unregisterSection = useCallback((sectionId: string) => {
        sectionRefs.current.delete(sectionId);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = sectionRefs.current.get(sectionId.replace("#", ""));

        if (!element) {
            console.warn(
                `attempted to scroll to non-existent section with id: ${sectionId}`
            );
            return;
        }

        const elementPosition = element.getBoundingClientRect().top;
        const scrollOffset = convertRemToPx(SCROLL_OFFSET);
        const mobileScrollOffset = convertRemToPx(MOBILE_SCROLL_OFFSET);

        const offsetPosition =
            elementPosition +
            window.pageYOffset -
            scrollOffset -
            (isMobileLayout() ? mobileScrollOffset : 0);

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const scrollSpyer = () => {
            const scrollPosition = window.scrollY + SPY_OFFSET;

            // find active section
            for (const section of sections) {
                const element = sectionRefs.current.get(section.id);

                if (!element) continue;

                const offsetTop = element.offsetTop;
                const offsetBottom = offsetTop + element.offsetHeight;

                // check if scroll position between top and bottom offsets
                if (
                    scrollPosition >= offsetTop &&
                    scrollPosition < offsetBottom
                ) {
                    setCurrentSection(section.id);
                    break;
                }
            }
        };

        scrollSpyer();

        window.addEventListener("scroll", scrollSpyer);

        return () => {
            // remove listener
            window.removeEventListener("scroll", scrollSpyer);
        };
    }, []);

    return (
        <ScrollContext.Provider
            value={{
                currentSection,
                scrollToSection,
                registerSection,
                unregisterSection,
            }}
        >
            {children}
        </ScrollContext.Provider>
    );
}

function useScroll() {
    const context = useContext(ScrollContext);

    if (!context) {
        throw new Error("useScroll must be used within a ScrollProvider");
    }

    return context;
}

export { ScrollProvider, useScroll };
