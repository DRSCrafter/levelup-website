import '../Styles/Components/navbar.css';
import React, {useEffect, useState} from 'react';

import {IconButton} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import SearchBar from "./searchBar";
import DarkModeButton from "./darkModeButton";
import MenuButton from "./menuButton";

function NavBar() {
    const [scrollPos, setScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        setScrollPos(document.body.getBoundingClientRect().top);
        setVisible(document.body.getBoundingClientRect().top > scrollPos);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const data = [
        {
            name: 'کنسول',
            list: [
                {name: 'نینتندو سوییچ', link: '#'},
                {name: 'پلی استیشن', link: '#'},
                {name: 'ایکس باکس', link: '#'},
            ]
        },
        {
            name: 'کنسول',
            list: [
                {name: 'نینتندو سوییچ', link: '#'},
                {name: 'پلی استیشن', link: '#'},
                {name: 'ایکس باکس', link: '#'},
            ]
        },
        {
            name: 'کنسول',
            list: [
                {name: 'نینتندو سوییچ', link: '#'},
                {name: 'پلی استیشن', link: '#'},
                {name: 'ایکس باکس', link: '#'},
            ]
        },
    ];

    return (
        <>
            <div className="navbar-root">
                <div className="navbar-container">
              <span className="navbar-icon-container">
                  <IconButton style={{marginRight: 10}} className="navbar-icon-btn">
                    <PersonIcon htmlColor="#0080FF"/>
                  </IconButton>
                  <IconButton className="navbar-icon-btn">
                    <AccountBalanceWalletIcon htmlColor="#0080FF"/>
                  </IconButton>
              </span>
                    <SearchBar/>
                    <img className="navbar-logo" src={require('../Assets/logo.png')} alt="logo"/>
                </div>
                <div className={`sub-navbar-container ${visible ? "active" : "hidden"}`}>
                    <DarkModeButton/>
                    <span className="sub-navbar-btn-container">
                    {data.map(menu => (
                        <MenuButton title={menu.name} list={menu.list}/>
                    ))}
                </span>
                </div>
            </div>
        </>
    );
}

export default NavBar;