import '../Styles/Components/counter.css';
import React from 'react';

import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Counter({value, onChange}) {
    return (
        <>
            <span className="product-counter">
                <IconButton color="primary" size="small" onClick={() => onChange(value + 1)}>
                    <AddIcon/>
                </IconButton>
                {value}
                <IconButton color="primary" size="small" onClick={() => onChange(value - 1)} disabled={value === 0}>
                    <RemoveIcon/>
                </IconButton>
            </span>
        </>
    );
}

export default Counter;