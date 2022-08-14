import '../Styles/Components/input.css';
import React from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";

function CheckBox({label}) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
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
                />}
                label={label}
                labelPlacement="end"
            />
        </div>
    );
}

export default CheckBox;