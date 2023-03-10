import React from "react";

export default interface SideFilter {
    label: string,
    children: React.ReactNode,
    overFlowVisible?: boolean
}