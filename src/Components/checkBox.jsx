import '../Styles/Components/input.css';
import React from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";

function CheckBox({label, onChanged}) {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
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