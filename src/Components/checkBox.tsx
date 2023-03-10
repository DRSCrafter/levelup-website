import '../Styles/Components/input.css';
import React from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";
import CheckBoxProps from "../types/components/checkBox";

function CheckBox({label, onChanged}: CheckBoxProps) {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        onChanged(event);
    };

    return (
        <div className="side-input-container">
            <FormControlLabel
                className="side-input"
                value="start"
                control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{'aria-label': 'controlled'}}
                    value={label}
                />}
                label={label}
                labelPlacement="end"
            />
        </div>
    );
}

export default CheckBox;