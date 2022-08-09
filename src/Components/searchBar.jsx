import '../Styles/Components/searchBar.css';
import React from 'react';
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    return (
        <>
            <div className="search-bar-container">
                <IconButton className="search-bar-btn">
                    <SearchIcon htmlColor="#0080FF"/>
                </IconButton>
                <input className="search-bar-input input" placeholder="چی میخوای بیا به خودم بگو"/>
            </div>
        </>
    );
}

export default SearchBar;