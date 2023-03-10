import React from "react";

export default interface RadioButton {
    selectedValue: string,
    value: string,
    onSelect: (value: string) => void,
    children: React.ReactNode
}