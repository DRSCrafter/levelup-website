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
        color: '#707070',
        fontFamily: "'Segoe UI Light', sans-serif"
    },
    selected: {
        color: '#ffffff',
        backgroundColor: 'rgb(0, 128, 255)',
        fontFamily: "'Segoe UI Light', sans-serif"
    }
}

export default RadioButton;