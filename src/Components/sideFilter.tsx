import '../Styles/Components/sideFilter.scss';
import React from "react";
import SideFilterProps from "../types/components/sideFilter";

function SideFilter({label, children, overFlowVisible}: SideFilterProps) {
    return (
        <>
            <div className="side__filter">
                <div className="side__filter__header">
                    <span className="side__filter__title">{label}</span>
                </div>
                <div className={`side__filter__list ${overFlowVisible ? 'overflow--visible' : ''}`}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default SideFilter;
