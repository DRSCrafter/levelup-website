import '../Styles/Components/menuButton.scss'
import React, {SetStateAction, useState} from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useNavigate} from "react-router-dom";
import MenuButtonProps from "../types/components/menuButton";

function MenuButton({title, list}: MenuButtonProps) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.ChangeEvent<SetStateAction<any>>) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const navigate = useNavigate();
    const handleClickMenu = (event: React.ChangeEvent<HTMLInputElement>) => {
        navigate(`./${event.currentTarget.dataset.myValue}`);
        handleClose();
    }

    return (
        <>
            <span className="navbar__button" onClick={handleClick}>
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
                    /*@ts-ignore*/
                    <MenuItem onClick={handleClickMenu} key={item.name} data-my-value={item.link}>
                        <span className="navbar__button--inner">
                            {item.name}
                        </span>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default MenuButton;