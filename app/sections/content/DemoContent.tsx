import { useTooltipHooks } from "hooks/useHoverTooltip";
import Link from "next/link";
import Image from "next/image";

export default function DemoContent() {
    return (
        <>
            <h1>Demo</h1>
            <p>
                Check out chesster.js in action with this interactive demo site.
                Play against an AI opponent or play locally on the same device.
                The source code for the demo is available{" "}
                <a
                    {...useTooltipHooks()}
                    className="hoverEffect underline"
                    href="https://github.com/waymondrang/chesster.js-demo"
                >
                    on GitHub
                </a>
                .
            </p>

            <Link {...useTooltipHooks()} id="demoLink" href="/demo">
                <Image
                    src="/assets/img/chesster.jpg"
                    alt="Screenshot of chesster.js demo website."
                    width={800}
                    height={600}
                />
                <div className="demo-overlay">
                    <div className="playButton">
                        <span>Play</span>{" "}
                        <span className="material-symbols-outlined">
                            arrow_outward
                        </span>
                    </div>
                </div>
            </Link>
        </>
    );
}
