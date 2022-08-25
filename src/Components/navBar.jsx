import '../Styles/Components/navbar.css';
import React, {useEffect, useState} from 'react';

import SearchBar from "./searchBar";
import DarkModeButton from "./darkModeButton";
import MenuButton from "./menuButton";
import UserPopover from "./userPopover";
import AccountPopover from "./accountPopover";

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

function NavBar() {
    const [scrollPos, setScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleScroll = () => {
        setScrollPos(document.body.getBoundingClientRect().top);
        setVisible(document.body.getBoundingClientRect().top > scrollPos);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="navbar-root">
                <div className="navbar-container">
              <span className="navbar-icon-container">
                  <UserPopover/>
                  <AccountPopover/>
              </span>
                    <SearchBar placeholder="چی میخوای بیا به خودم بگو"/>
                    <img className="navbar-logo" src={require('../Assets/logo.png')} alt="logo"/>
                </div>
                <div className={`sub-navbar-container ${visible ? "active" : "hidden"}`}>
                    <DarkModeButton/>
                    <span className="sub-navbar-btn-container">
                    {data.map(menu => (
                        <MenuButton title={menu.name} list={menu.list} anchorEl={anchorEl} onClick={handleClick}
                                    onClose={handleClose} key={menu.name} />
                    ))}
                </span>
                </div>
            </div>
        </>
    );
}

export default NavBar;