import '../Styles/Components/searchBar.scss';
import React from 'react';
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SearchBarProps from "../types/components/searchBar";

function SearchBar({placeholder, isSideBar, value, onChange, onSubmit, isFilterDialog}: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <>
            <form
                className={`search-bar ${isSideBar ? 'search-bar--side' : ''} ${isFilterDialog ? 'filter__dialog' : ''}`}
                onSubmit={handleSubmit}
            >
                <IconButton className="search__button" type="submit">
                    <SearchIcon htmlColor="#0080FF"/>
                </IconButton>
                <input className="search-bar__input input" placeholder={placeholder} value={value} onChange={onChange}/>
            </form>
        </>
    );
}

export default SearchBar;