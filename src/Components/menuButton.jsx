import '../Styles/Components/menuButton.css'
import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function MenuButton({title, list}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <span className="navbar-menu-btn" onClick={handleClick}>
                <ExpandMoreIcon fontSize="small"/>
                {title}
            </span>
            <Menu
                sx={{marginTop: "5px"}}
                disableScrollLock={true}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
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
                    <MenuItem onClick={handleClose}>
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