import React from 'react';
import {FormControlLabel, Radio} from "@mui/material";
import RadioBoxProps from "../types/components/radioBox";

function RadioBox({label, onChange, selectedValue, value}: RadioBoxProps) {

    return (
        <>
            <div className="side__input__root">
                <FormControlLabel
                    className="side-input"
                    value="start"
                    control={
                        <Radio
                            checked={selectedValue === value}
                            onChange={onChange}
                            value={value}
                            name="radio-buttons"
                        />}
                    label={label}
                    labelPlacement="end"
                />
            </div>
        </>
    );
}

export default RadioBox;