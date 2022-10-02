import React, {useContext} from 'react';
import {
    Box,
    Drawer as DrawerComponent,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import drawerList from "../Data/drawerList";
import UserContext from "../Context/userContext";
import {useNavigate} from "react-router-dom";
import SearchDialog from "./Dialogs/searchDialog";
import CategoryDialog from "./Dialogs/categoryDialog";

function Drawer({open, onDrawerToggle}) {
    const {user, isLoggedIn} = useContext(UserContext);

    const [search, setSearch] = React.useState(false);
    const [category, setCategory] = React.useState(false);

    const navigate = useNavigate();
    const handleNavigate = (destination) => navigate(`./${destination}`);
    const handleCloseDrawer = () => onDrawerToggle(false);

    const handleOpenSearch = () => {
        setSearch(true);
        handleCloseDrawer();
    }
    const handleOpenCategory = () => {
        setCategory(true);
        handleCloseDrawer();
    }
    drawerList.productList = drawerList.products(handleOpenCategory, handleOpenSearch);
    drawerList.user = isLoggedIn ? drawerList.user : drawerList.default;

    const handleCloseSearch = () => setSearch(false);
    const handleCloseCategory = () => setCategory(false);

    return (
        <>
            <DrawerComponent
                anchor="left"
                open={open}
                onClose={handleCloseDrawer}
            >
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={() => onDrawerToggle(false)}
                    onKeyDown={() => onDrawerToggle(false)}
                >
                    <div className="drawer-info-container">
                        <div className="user-personal-info">
                            <img src={user && user.userImage}
                                 style={{width: 150, height: 150, borderRadius: '50%'}} alt="تصویر کاربر"/>
                            <div className="user-info-name">{user && user.name}</div>
                            <div className="user-info-email">{user && user.email}</div>
                        </div>
                    </div>
                    <Divider/>
                    <List>
                        {drawerList.productList.map((item, index) => (
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
                        {drawerList.user.map((item, index) => (
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
            </DrawerComponent>
            <SearchDialog open={search} onClose={handleCloseSearch}/>
            <CategoryDialog open={category} onClose={handleCloseCategory}/>
        </>
    );
}

export default Drawer;