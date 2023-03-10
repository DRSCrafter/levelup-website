import React from "react";

export default interface RadioBox {
    label: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    selectedValue: string,
    value: string
}