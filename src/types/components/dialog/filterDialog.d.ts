import Dialog from "./dialog";
import React from "react";

export default interface FilterDialog extends Dialog {
    onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    radioValue: string,
    onRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    maxPrice: any,
    onSubmitString: (str: string) => void,
    range: number,
    onRangeChange: (event: any) => void,
    onPriceChange: (event: any, newValue: any) => void,
    string: string,
    onStringChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}