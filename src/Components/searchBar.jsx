import '../Styles/Components/searchBar.css';
import React from 'react';
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({placeholder, isSideBar}) {
    return (
        <>
            <div className={`search-bar-container ${isSideBar ? 'side-search-bar' : ''}`}>
                <IconButton className="search-bar-btn">
                    <SearchIcon htmlColor="#0080FF"/>
                </IconButton>
                <input className="search-bar-input input" placeholder={placeholder}/>
            </div>
        </>
    );
}

export default SearchBar;