import '../Styles/Components/menuButton.css'
import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function MenuButton({title, list, anchorEl, onClick, onClose}) {
    const open = Boolean(anchorEl);

    return (
        <>
            <span className="navbar-menu-btn" onClick={onClick}>
                <ExpandMoreIcon fontSize="small"/>
                {title}
            </span>
            <Menu
                sx={{marginTop: "5px"}}
                disableScrollLock={true}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {list.map(item => (
                    <MenuItem onClick={onClose}>
                    <span className="navbar-menu-btn-inner">
                        {item.name}
                    </span>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default MenuButton;