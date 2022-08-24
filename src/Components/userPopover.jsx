import '../Styles/Components/userPopover.css';
import React, {useState} from 'react';
import IconPopOver from "./iconPopOver";

import {Button, IconButton} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

function UserPopover() {
    const [popAnchorEl1, setPopAnchorEl1] = useState(null);

    const handlePopOver1 = (event) => {
        setPopAnchorEl1(event.currentTarget);
    }
    const handleClosePopOver1 = () => {
        setPopAnchorEl1(null);
    }
    const openUser = Boolean(popAnchorEl1);
    const userID = openUser ? 'user-popover' : undefined;

    return (
        <>
            <IconButton style={{marginRight: 10}} className="navbar-icon-btn" aria-describedby={userID}
                        onClick={handlePopOver1}>
                <PersonIcon htmlColor="#0080FF"/>
            </IconButton>
            <IconPopOver anchorEl={popAnchorEl1} onClose={handleClosePopOver1} open={openUser} id={userID}>
                <div className="user-popover-container">
                    <div className="user-popover-topside">
                        <div className="user-popover-topside-info">
                            <div style={{
                                width: 70,
                                height: 70,
                                backgroundColor: 'grey',
                                borderRadius: '50%',
                                position: "absolute",
                                top: -15,
                                right: 5
                            }}/>
                            <div className="user-popover-topside-info-inner">
                                <div>محمد رضا آراسته شاهراه</div>
                                <div className="font-sm">drsprogramming2020@gmail.com</div>
                            </div>
                        </div>
                        <div className="user-popover-topside-account">
                            مانده اعتبار: 0 تومان
                        </div>
                    </div>
                    <div className="user-popover-downside">
                        <Button style={{
                            padding: 10,
                            width: '100%',
                            display: "flex",
                            justifyContent: "flex-start",
                            color: '#707070',
                            fontFamily: 'Segoe UI Light'
                        }} variant="text">
                            <ShoppingCartOutlinedIcon style={{marginLeft: 15}}/>
                            سفارشات من
                        </Button>
                        <Button style={{
                            padding: 10,
                            width: '100%',
                            display: "flex",
                            justifyContent: "flex-start",
                            color: '#707070',
                            fontFamily: 'Segoe UI Light',
                        }} variant="text">
                            <LogoutIcon style={{marginLeft: 15}}/>
                            خروج از حساب کاربری
                        </Button>
                    </div>
                </div>
            </IconPopOver>
        </>
    );
}

export default UserPopover;