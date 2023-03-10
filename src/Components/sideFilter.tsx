import '../Styles/Components/sideFilter.css';
import React from "react";
import SideFilterProps from "../types/components/sideFilter";

function SideFilter({label, children, overFlowVisible}: SideFilterProps) {
    return (
        <>
            <div className="side-filter-root">
                <div className="side-filter-header">
                    <span className="side-filter-title">{label}</span>
                </div>
                <div className={`side-filter-list ${overFlowVisible ? 'overflow-visible' : ''}`}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default SideFilter;
