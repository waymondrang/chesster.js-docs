"use client";

import { useSidebar } from "../context/SidebarProvider";

function TinyHeader() {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="mobileHeader">
            <button className="squareButton" onClick={toggleSidebar}>
                <span className="material-symbols-outlined">
                    left_panel_open
                </span>
            </button>

            <h1>
                chesster.js <span className="docs">docs</span>
            </h1>
        </header>
    );
}

export default TinyHeader;
