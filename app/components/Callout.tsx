"use client";

import { jxc } from "utilities";

function Callout({
    type = "note",
    title,
    children,
}: {
    type?: "note" | "warning";
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={jxc("callout", type === "warning" ? "warning" : "note")}
        >
            <strong>{title}</strong> {children}
        </div>
    );
}

export default Callout;
