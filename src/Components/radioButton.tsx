import React from 'react';
import {Button} from "@mui/material";
import RadioButtonProps from "../types/components/radioButton";

function RadioButton({selectedValue, value, onSelect, children}: RadioButtonProps) {
    return (
        <>
            <span className="radio-btn">
                <Button
                    variant={`${selectedValue === value ? "contained" : "text"}`}
                    onClick={() => onSelect(selectedValue === value ? "" : value)}
                    style={selectedValue === value ? styles.selected : styles.notSelected}
                >
                    {children}
                </Button>
            </span>
        </>
    );
}

const styles = {
    notSelected: {
        color: 'var(--var-color-gray)',
        fontFamily: "'Segoe UI Light', sans-serif"
    },
    selected: {
        color: 'white',
        backgroundColor: 'var(--var-color-primary)',
        fontFamily: "'Segoe UI Light', sans-serif"
    }
}

export default RadioButton;