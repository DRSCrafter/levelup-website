import '../Styles/layout/navbar.css';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {useMediaQuery} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import SearchBar from "../Components/searchBar";
import MenuButton from "../Components/menuButton";
import UserPopover from "../Components/Popovers/userPopover";
import AccountPopover from "../Components/Popovers/accountPopover";
import categories from '../Data/categories';
import Drawer from "./drawer";

function NavBar() {
    const [scrollPos, setScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [drawer, setDrawer] = useState(false);
    const [search, setSearch] = useState('');

    const handleScroll = () => {
        setScrollPos(document.body.getBoundingClientRect().top);
        setVisible(document.body.getBoundingClientRect().top > scrollPos);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setDrawer(open);
    };

    const isPC = useMediaQuery('(min-width: 1024px)');
    const navigate = useNavigate();

    const handleDrawerToggle = (value) => setDrawer(value);
    const handleSetString = (event) => setSearch(event.target.value);
    const handleSearch = () => window.location = `../../search?str=${search}`;

    return (
        <>
            <div className="navbar-root">
                <div className="navbar-container">
              <span className="navbar-icon-container">
                  {isPC ?
                      <>
                          <UserPopover/>
                          <AccountPopover/>
                      </> :
                      <>
                          <IconButton
                              edge="start"
                              style={{boxShadow: "none"}}
                              onClick={toggleDrawer(true)}
                          >
                              <MenuIcon/>
                          </IconButton>
                      </>
                  }
              </span>
                    <SearchBar placeholder="چی میخوای بیا به خودم بگو" value={search} onChange={handleSetString}
                               onSubmit={handleSearch}/>
                    <img className="navbar-logo" src={require('../Assets/logo.png')} alt="logo"
                         onClick={() => navigate('./')}/>
                </div>
                <div className={`sub-navbar-container ${visible ? "active" : "hidden"}`}>
                    <span className="sub-navbar-btn-container">
                        {categories.map(menu => (
                            <MenuButton title={menu.name} list={menu.list} key={menu.name}/>
                        ))}
                    </span>
                </div>
            </div>
            <Drawer open={drawer} onDrawerToggle={handleDrawerToggle}/>
        </>
    );
}

export default NavBar;