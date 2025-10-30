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

export const metadata: Metadata = {
    title: "chesster.js documentation",
    description:
        "chesster.js is a dependency-free TypeScript chess library focused on performance and accuracy.",
};

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
            <head>
                {/* Note: Icon names in the url MUST be specified in alphabetical order. */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=arrow_outward,dark_mode,error,folder_code,left_panel_close,left_panel_open,light_mode,routine&display=block"
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
