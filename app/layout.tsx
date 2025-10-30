"use client";

import TinyHeader from "components/TinyHeader";
import Sidebar from "components/Sidebar";
import "css/index.scss";
import type { Metadata } from "next";
import { HighlightProvider } from "context/HighlightProvider";
import { SidebarProvider } from "context/SidebarProvider";
import { ScrollProvider } from "context/ScrollProvider";
import { TooltipProvider } from "context/TooltipProvider";
import { ThemeProvider } from "context/ThemeProvider";
import { Manrope, Google_Sans_Code } from "next/font/google";
import { jxc } from "utilities";

const manrope = Manrope({
    subsets: ["latin"],
});

const googleSansCode = Google_Sans_Code({
    subsets: ["latin"],
});

// export const metadata: Metadata = {
//     title: "chesster.js documentation",
//     description:
//         "chesster.js is a modern TypeScript library focused on performance and accuracy.",
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning={true}
            className={jxc(manrope.className, googleSansCode.className)}
        >
            <head
                onLoad={() => {
                    document.documentElement.style.backgroundColor = "red";
                }}
            >
                {/* works in conjunction with theme provider */}
                <script src="/assets/scripts/init_dark_mode.js" async></script>

                <link
                    rel="icon"
                    type="image/png"
                    href="/assets/img/favicon.png"
                />
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/assets/img/favicon.svg"
                />

                {/* todo: find better solution to this import */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_outward"
                />
            </head>

            <body>
                <ThemeProvider>
                    <TooltipProvider>
                        <HighlightProvider>
                            <SidebarProvider>
                                <ScrollProvider>
                                    <div className="content">
                                        <Sidebar />
                                        <main className="mainContent">
                                            <TinyHeader />
                                            <div className="widthContainer">
                                                {children}
                                            </div>
                                        </main>
                                    </div>
                                </ScrollProvider>
                            </SidebarProvider>
                        </HighlightProvider>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
