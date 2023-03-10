import React from "react";
import Product from "../context/product";

export default interface Products {
    items: Product[],
    companies: string[],
    onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    radioValue: string,
    onRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    maxPrice: any,
    onSubmitString: (str: string) => void,
    filterValue: string,
    onFilterChange: (value: string) => void
}