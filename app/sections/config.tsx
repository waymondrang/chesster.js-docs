import { SectionData } from "./sections";
import IntroductionContent from "./content/IntroductionContent";
import InstallationContent from "./content/InstallationContent";
import QuickStartContent from "./content/QuickStartContent";
import ChessterReference from "./content/api/ChessterReference";
import GuideBasicContent from "./content/GuideBasicContent";
import ExamplesContent from "./content/ExamplesContent";
import DemoContent from "./content/DemoContent";

export const sections: SectionData[] = [
    {
        id: "introduction",
        title: "Introduction",
        content: <IntroductionContent />,
    },
    {
        id: "installation",
        title: "Installation",
        content: <InstallationContent />,
    },
    {
        id: "quick-start",
        title: "Quick Start",
        content: <QuickStartContent />,
    },
    {
        id: "demo",
        title: "Demo",
        content: <DemoContent />,
    },
    {
        id: "examples",
        title: "Examples",
        content: <ExamplesContent />,
    },
    {
        id: "api-chess",
        title: "Chesster",
        category: "API Reference",
        content: <ChessterReference />,
    },
    {
        id: "guide-basic",
        title: "Basic Usage",
        category: "Guides",
        content: <GuideBasicContent />,
    },
];
