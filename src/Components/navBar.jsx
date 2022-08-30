import '../Styles/Components/navbar.css';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import UserContext from "../Context/userContext";
import SearchBar from "./searchBar";
import SearchDialog from "./searchDialog";
import DarkModeButton from "./darkModeButton";
import MenuButton from "./menuButton";
import UserPopover from "./userPopover";
import AccountPopover from "./accountPopover";
import CategoryDialog from "./categoryDialog";

import {
    Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from "@mui/icons-material/Person";
import ShopIcon from '@mui/icons-material/Shop';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Inventory2Icon from '@mui/icons-material/Inventory2';


const data = [
    {
        name: 'سایر',
        tag: 'other',
        icon: <Inventory2Icon/>,
        list: [
            {name: 'گیفت کارت', link: 'cat/giftcard'},
            {name: 'لایسنس قانونی', link: 'cat/license'},
        ]
    },
    {
        name: 'بازی',
        tag: 'game',
        icon: <SportsEsportsIcon/>,
        list: [
            {name: 'نینتندو سوییچ', link: 'cat/switch'},
            {name: 'پلی استیشن', link: 'cat/playstation'},
            {name: 'ایکس باکس', link: 'cat/xbox'},
        ]
    },
    {
        name: 'کنسول و لوازم جانبی',
        tag: 'console',
        icon: <VideogameAssetIcon/>,
        list: [
            {name: 'کنسول', link: 'cat/console'},
            {name: 'لوازم جانبی', link: 'cat/accessories'},
        ]
    },
];


function NavBar() {
    const [scrollPos, setScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawer, setDrawer] = useState(false);
    const [search, setSearch] = React.useState(false);
    const [string, setString] = useState('');
    const [category, setCategory] = React.useState(false);

    const handleScroll = () => {
        setScrollPos(document.body.getBoundingClientRect().top);
        setVisible(document.body.getBoundingClientRect().top > scrollPos);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setDrawer(open);
    };

    const handleOpenSearch = () => {
        setSearch(true);
        setDrawer(false);
    }
    const handleCloseSearch = () => setSearch(false);

    const handleOpenCategory = () => {
        setCategory(true);
        setDrawer(false);
    }
    const handleCloseCategory = () => setCategory(false);

    const handleSetString = (event) => setString(event.target.value);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const isPC = useMediaQuery('(min-width: 1024px)');

    const {user} = useContext(UserContext);

    const navigate = useNavigate();
    const handleNavigate = (destination) => navigate(`./${destination}`);
    const handleSearch = () => window.location = `/search?str=${string}`;

    const drawerList1 = [
        {
            text: 'دسته بندی',
            icon: <ListIcon/>,
            onClick: handleOpenCategory
        },
        {
            text: 'جستجو',
            icon: <SearchIcon/>,
            onClick: handleOpenSearch
        }
    ];
    const drawerList2 = [
        {
            text: 'حساب کاربری',
            icon: <PersonIcon/>,
            link: 'account'
        },
        {
            text: 'سبد خرید',
            icon: <ShopIcon/>,
            link: 'shoppingCart'
        }
    ]

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
                    <SearchBar placeholder="چی میخوای بیا به خودم بگو" value={string} onChange={handleSetString}
                               onSubmit={handleSearch}/>
                    <img className="navbar-logo" src={require('../Assets/logo.png')} alt="logo"
                         onClick={() => navigate('./')}/>
                </div>
                <div className={`sub-navbar-container ${visible ? "active" : "hidden"}`}>
                    <span className="sub-navbar-btn-container">
                        {data.map(menu => (
                            <MenuButton title={menu.name} list={menu.list} anchorEl={anchorEl} key={menu.name}/>
                        ))}
                    </span>
                    {/*<DarkModeButton/>*/}
                </div>
            </div>
            <Drawer
                anchor="left"
                open={drawer}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <div className="drawer-info-container">
                        <div className="user-personal-info">
                            <img src={user && `http://localhost:3001/${user.userImage}`}
                                 style={{width: 150, height: 150, borderRadius: '50%'}} alt="تصویر کاربر"/>
                            <div className="user-info-name">{user && user.name}</div>
                            <div className="user-info-email">{user && user.email}</div>
                        </div>
                    </div>
                    <Divider/>
                    <List>
                        {drawerList1.map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => item.onClick()}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        {drawerList2.map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => handleNavigate(item.link)}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <SearchDialog open={search} onClose={handleCloseSearch} value={string} onChange={handleSetString}
                          onSubmit={handleSearch}/>
            <CategoryDialog open={category} onClose={handleCloseCategory} data={data} onTrigger={handleNavigate}/>
        </>
    );
}

export default NavBar;