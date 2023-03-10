import React from "react";

export default interface SearchBar {
    placeholder: string,
    isSideBar?: boolean,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    onSubmit: () => void,
    isFilterDialog?: boolean
}