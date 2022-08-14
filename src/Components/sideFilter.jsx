import '../Styles/Components/sideFilter.css';
import React from "react";
import CheckBox from "../Components/checkBox";

function SideFilter({label, children}) {
    return (
        <>
            <div className="side-filter-root">
                <div className="side-filter-header"><span className="side-filter-title">{label}</span></div>
                <div className="side-filter-list">
                    {children}
                </div>
            </div>
        </>
    );
}

export default SideFilter;
