"use client";

import { ReactNode } from "react";
import { jxc } from "utilities";

function Callout({
    type = "note",
    title,
    children,
}: {
    type?: "note" | "warning";
    title: string;
    children: ReactNode;
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
