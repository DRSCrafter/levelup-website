import React from 'react';
import {FormControlLabel, Radio} from "@mui/material";

function RadioBox({label, onChange, selectedValue, value}) {

    return (
        <>
            <div className="side-input-container">
                <FormControlLabel
                    className="side-input"
                    value="start"
                    control={
                        <Radio
                            checked={selectedValue === value}
                            onChange={onChange}
                            value={value}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                        />}
                    label={label}
                    labelPlacement="end"
                />
            </div>
        </>
    );
}

export default RadioBox;