import React, {useState} from 'react';

import {CacheProvider, ThemeProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import {
    AppBar,
    Collapse,
    Dialog,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import {ExpandLess, ExpandMore} from "@mui/icons-material";

import categories from "../../Data/categories";
import {useNavigate} from "react-router-dom";

function CategoryDialog({onClose, open}) {
    const [openCategory, setOpenCategory] = useState({
        console: false,
        game: false,
        other: false
    })

    const handleToggleCategory = (category) => setOpenCategory({...openCategory, [category]: !openCategory[category]});
    const navigate = useNavigate();
    const handleNavigate = (destination) => {
        navigate(`./${destination}`);
        onClose()
    };

    const theme = createTheme({
        direction: 'rtl',
    });
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <div dir="rtl">
                        <Dialog fullScreen open={open} onClose={onClose}>
                            <AppBar sx={{position: 'relative'}}>
                                <Toolbar>
                                    <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                                        <CloseIcon/>
                                    </IconButton>
                                    <Typography sx={{ml: 2, flex: 1, direction: "rtl"}} variant="h6" component="div">
                                        دسته بندی
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <List>
                                {categories.map((category) => (
                                    <>
                                        <ListItemButton onClick={() => handleToggleCategory(category.tag)}>
                                            <ListItemIcon>
                                                {category.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={category.name}/>
                                            {openCategory[category.tag] ? <ExpandLess/> : <ExpandMore/>}
                                        </ListItemButton>
                                        <Collapse in={openCategory[category.tag]} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {category.list.map(subCategory => (
                                                    <ListItemButton sx={{pl: 4}}
                                                                    onClick={() => handleNavigate(subCategory.link, category.tag)}>
                                                        <ListItemText primary={subCategory.name}/>
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </>
                                ))}
                            </List>
                        </Dialog>
                    </div>
                </ThemeProvider>
            </CacheProvider>
        </>
    );
}

export default CategoryDialog;