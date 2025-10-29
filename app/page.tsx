"use client";

import Section from "components/Section";
import { useTooltipHooks } from "hooks/useHoverTooltip";
import { sections } from "sections/config";

export default function Home() {
    return (
        <>
            {sections.map((section) => (
                <Section key={section.id} id={section.id}>
                    {section.content}
                </Section>
            ))}

            <footer className="footer">
                <a
                    {...useTooltipHooks()}
                    id="waymondrangLogo"
                    href="https://waymondrang.com"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1000 1000"
                    >
                        <path d="M500,0C223.9,0,0,223.9,0,500s223.9,500,500,500,500-223.9,500-500S776.1,0,500,0ZM400,850c-138.1,0-250-111.9-250-250s111.9-250,250-250,250,111.9,250,250-111.9,250-250,250Z" />
                        <path d="M327.1,752.6c-21.4-5.7-40-14.2-55.8-25.4-15.8-11.2-27.3-24.6-34.2-40.3-7-15.6-7.9-33.1-2.7-52.3,3.4-12.7,8.9-22.9,16.5-30.6,7.6-7.7,16.2-13.6,25.8-17.6,9.6-4.1,19.4-6.8,29.4-8.2l.2-.8c-5.5-5.3-10.7-11.3-15.6-18.1-4.8-6.8-8.3-14.5-10.3-23.2-2-8.7-1.6-18.3,1.2-28.8,4.3-16.2,12.7-28.7,25-37.4,12.3-8.7,27.1-14,44.4-15.7,17.3-1.7,35.5,0,54.7,5.1,19.2,5.1,35.8,12.8,49.9,22.9,14.1,10.2,24.3,22.1,30.6,35.8,6.3,13.7,7.3,28.7,3,44.9-2.8,10.5-7.3,19.1-13.4,25.6-6.1,6.5-12.9,11.5-20.5,14.9-7.6,3.5-15.1,6.1-22.5,7.9l-.2.8c7.9,6.2,15,13.4,21.3,21.8,6.3,8.4,10.8,17.8,13.5,28.2,2.7,10.4,2.4,22-1,34.7-5.1,19.2-14.7,33.8-28.5,43.9-13.9,10.1-30.4,16-49.8,17.8-19.3,1.8-39.7-.2-61-5.9ZM341,701.1c14.9,4,27.3,2.9,37.2-3.3,9.9-6.2,16.4-15,19.4-26.3,3-11.1,1.7-21.7-3.8-31.9-5.5-10.2-15.7-17.3-30.6-21.2-14.9-4-27.3-3-37.1,3.1-9.9,6-16.3,14.6-19.3,25.7-3,11.4-1.8,22.2,3.7,32.5,5.5,10.3,15.7,17.5,30.6,21.4ZM374.4,576.1c14.3,3.8,25.7,3.2,34.2-1.9,8.5-5.1,14-12.4,16.5-21.9,2.5-9.2,1.3-18.1-3.5-26.8-4.8-8.7-14.3-14.9-28.7-18.8-14.1-3.8-25.4-3.1-34,2-8.6,5.1-14.1,12.2-16.6,21.4-2.5,9.5-1.3,18.6,3.6,27.3,4.9,8.7,14.4,14.9,28.5,18.7Z" />
                    </svg>
                </a>

                <div className="links">
                    <a
                        {...useTooltipHooks()}
                        className="hoverEffect"
                        href="https://github.com/waymondrang/chesster.js"
                    >
                        <span>GitHub</span>
                        <span className="material-symbols-outlined">
                            arrow_outward
                        </span>
                    </a>
                    <a
                        {...useTooltipHooks()}
                        className="hoverEffect"
                        href="https://npmjs.com/package/chesster.js"
                    >
                        <span>npm</span>
                        <span className="material-symbols-outlined">
                            arrow_outward
                        </span>
                    </a>

                    <span id="copyright">&copy; 2025 Raymond Wang</span>
                </div>
            </footer>
        </>
    );
}
