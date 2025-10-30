"use client";

import { createContext, useContext, useState } from "react";

interface SidebarContextType {
    isOpen: boolean;

    toggleSidebar: () => void;

    openSidebar: () => void;
    closeSidebar: () => void;
}

interface SidebarProviderrProps {
    children: React.ReactNode;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

function SidebarProvider({ children }: SidebarProviderrProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const openSidebar = () => {
        setIsOpen(true);
    };

    return (
        <SidebarContext.Provider
            value={{ isOpen, toggleSidebar, closeSidebar, openSidebar }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

function useSidebar() {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }

    return context;
}

export { SidebarProvider, useSidebar };
