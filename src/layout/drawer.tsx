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
import drawerList from "../Data/drawerList.js";
import UserContext from "../Context/userContext.js";
import {useNavigate} from "react-router-dom";
import SearchDialog from "../Components/Dialogs/searchDialog.js";
import CategoryDialog from "../Components/Dialogs/categoryDialog.js";
import DrawerProps, {DrawerList} from "../types/layout/drawer";

function Drawer({open, onDrawerToggle}: DrawerProps) {
    const {user, isLoggedIn} = useContext(UserContext);

    const [search, setSearch] = React.useState(false);
    const [category, setCategory] = React.useState(false);

    const navigate = useNavigate();
    const handleNavigate = (destination: string) => navigate(`./${destination}`);
    const handleCloseDrawer = () => onDrawerToggle(false);

    const handleOpenSearch = () => {
        setSearch(true);
        handleCloseDrawer();
    }
    const handleOpenCategory = () => {
        setCategory(true);
        handleCloseDrawer();
    }
    (drawerList.productList as any) = drawerList.products(handleOpenCategory, handleOpenSearch);
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
                    <div className="drawer__info">
                        <div className="account__user__details">
                            <img
                                src={user && user.userImage}
                                className="account__user__image"
                                alt="تصویر کاربر"
                            />
                            <div className="account__user__name">{user && user.name}</div>
                            <div className="account__user__email">{user && user.email}</div>
                        </div>
                    </div>
                    <Divider/>
                    <List>
                        {(drawerList.productList as DrawerList).map((item, index) => (
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