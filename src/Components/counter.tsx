import '../Styles/Components/counter.scss';
import React from 'react';

import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CounterProps from "../types/components/counter";

function Counter({value, onChange, maxValue}: CounterProps) {
    return (
        <>
            <span className="counter">
                <IconButton
                    color="primary"
                    size="small"
                    onClick={() => onChange(+value + 1)}
                    disabled={value === maxValue}
                >
                    <AddIcon/>
                </IconButton>
                {value}
                <IconButton
                    color="primary"
                    size="small"
                    onClick={() => onChange(+value - 1)}
                    disabled={+value === 0}
                >
                    <RemoveIcon/>
                </IconButton>
            </span>
        </>
    );
}

export default Counter;