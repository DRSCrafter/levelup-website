import '../Styles/Components/searchBar.css';
import React from 'react';
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({placeholder, isSideBar, value, onChange, onSubmit, isFilterDialog}) {
    return (
        <>
            <div
                className={`search-bar-container ${isSideBar ? 'side-search-bar' : ''} ${isFilterDialog ? 'filter-dialog' : ''}`}>
                <IconButton className="search-bar-btn" onClick={() => onSubmit(value)}>
                    <SearchIcon htmlColor="#0080FF"/>
                </IconButton>
                <input className="search-bar-input input" placeholder={placeholder} value={value} onChange={onChange}/>
            </div>
        </>
    );
}

export default SearchBar;