"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useScroll } from "context/ScrollProvider";

function Section({ id, children }: { id: string; children: ReactNode }) {
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
