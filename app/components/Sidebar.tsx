"use client";

import { useRef, useMemo } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { sections } from "sections/config";
import {
    groupSectionsByCategory,
    SectionCategory,
    SectionData,
} from "sections/sections";
import { useSidebar } from "context/SidebarProvider";
import { isMobileLayout, jxc } from "utilities";
import { useScroll } from "context/ScrollProvider";
import ThemeButton from "components/ThemeButton";
import { useTooltipHooks } from "hooks/useHoverTooltip";

function Sidebar() {
    const groupedSections = useMemo<(SectionData | SectionCategory)[]>(
        () => groupSectionsByCategory(sections),
        []
    );

    const navRef = useRef<HTMLElement>(null);

    const { isOpen, closeSidebar } = useSidebar();
    const { currentSection } = useScroll();

    function handleClick(e: ReactMouseEvent<HTMLAnchorElement>): void {
        if (isMobileLayout()) closeSidebar();
    }

    return (
        <>
            {/* background overlay */}
            <div
                className={jxc("sidebarOverlay", isOpen && "active")}
                onClick={closeSidebar}
            ></div>

            <aside className={jxc("sidebar", isOpen && "active")}>
                <div className="sidebarHeader">
                    <div className="content">
                        <div>
                            <div id="logo">
                                <Image
                                    src="/assets/img/logo.png"
                                    alt="chesster.js logo"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <h2>
                                chesster.js <span className="docs">docs</span>
                            </h2>
                        </div>

                        <button
                            id="closeSidebar"
                            className="squareButton"
                            onClick={closeSidebar}
                        >
                            <span className="material-symbols-outlined">
                                left_panel_close
                            </span>
                        </button>
                    </div>
                </div>

                <nav className="sidebarNav" ref={navRef}>
                    <ul>
                        {groupedSections.map((item, index) => {
                            if ("sections" in item) {
                                //////////////
                                // CATEGORY //
                                //////////////

                                return (
                                    <li key={index}>
                                        <span className="navSection">
                                            {item.name}
                                        </span>

                                        <ul>
                                            {item.sections.map((section) => (
                                                <li key={section.id}>
                                                    <a
                                                        onClick={handleClick}
                                                        href={`#${section.id}`}
                                                        className={jxc(
                                                            "navLink",
                                                            currentSection ===
                                                                section.id &&
                                                                "active"
                                                        )}
                                                    >
                                                        {section.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                );
                            } else {
                                ////////////////
                                // STANDALONE //
                                ////////////////

                                return (
                                    <li key={item.id}>
                                        <a
                                            onClick={handleClick}
                                            href={`#${item.id}`}
                                            className={jxc(
                                                "navLink",
                                                currentSection === item.id &&
                                                    "active"
                                            )}
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </nav>

                <div className="sidebarFooter">
                    {/* button to documentation website */}
                    <a
                        {...useTooltipHooks()}
                        className="squareButton"
                        href="https://github.com/waymondrang/chesster.waymondrang.com"
                    >
                        <span className="material-symbols-outlined">
                            folder_code
                        </span>
                    </a>

                    {/* button to toggle themes */}
                    <ThemeButton />
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
