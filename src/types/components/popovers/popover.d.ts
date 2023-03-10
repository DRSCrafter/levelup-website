import React from "react";

export default interface Popover {
    anchorEl: Element | null,
    open: boolean,
    onClose: () => void,
    id: string,
    children: React.ReactNode
}