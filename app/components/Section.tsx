"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "context/ScrollProvider";

interface SectionProps {
    id: string;
    children: React.ReactNode;
}

function Section({ id, children }: SectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { registerSection, unregisterSection } = useScroll();

    useEffect(() => {
        if (sectionRef.current) {
            registerSection(id, sectionRef.current);
        }

        return () => {
            unregisterSection(id);
        };
    }, [id, registerSection, unregisterSection]);

    return (
        <section id={id} ref={sectionRef}>
            {children}
        </section>
    );
}

export default Section;
