import '../Styles/Components/searchBar.css';
import React from 'react';
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({placeholder, isSideBar, value, onChange, onSubmit}) {
    return (
        <>
            <div className={`search-bar-container ${isSideBar ? 'side-search-bar' : ''}`}>
                <IconButton className="search-bar-btn" onClick={onSubmit}>
                    <SearchIcon htmlColor="#0080FF"/>
                </IconButton>
                <input className="search-bar-input input" placeholder={placeholder} value={value} onChange={onChange}/>
            </div>
        </>
    );
}

export default SearchBar;