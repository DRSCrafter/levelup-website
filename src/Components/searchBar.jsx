import '../Styles/Components/searchBar.css';
import React from 'react';
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({placeholder, isSideBar, value, onChange, onSubmit, isFilterDialog}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
    }

    return (
        <>
            <form
                className={`search-bar-container ${isSideBar ? 'side-search-bar' : ''} ${isFilterDialog ? 'filter-dialog' : ''}`}
            onSubmit={handleSubmit}>
                <IconButton className="search-bar-btn" type="submit">
                    <SearchIcon htmlColor="#0080FF"/>
                </IconButton>
                <input className="search-bar-input input" placeholder={placeholder} value={value} onChange={onChange}/>
            </form>
        </>
    );
}

export default SearchBar;