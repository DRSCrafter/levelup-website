import '../Styles/Components/userPopover.css';
import React, {useContext, useState} from 'react';
import IconPopOver from "./iconPopOver";

import {Button, IconButton} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import UserContext from "../Context/userContext";
import {useNavigate} from "react-router-dom";

function UserPopover() {
    const currentUser = useContext(UserContext).user;

    const navigate = useNavigate();

    const [popAnchorEl1, setPopAnchorEl1] = useState(null);

    const handlePopOver1 = (event) => {
        setPopAnchorEl1(event.currentTarget);
    }
    const handleClosePopOver1 = () => {
        setPopAnchorEl1(null);
    }
    const openUser = Boolean(popAnchorEl1);
    const userID = openUser ? 'user-popover' : undefined;

    const handleLogOut = () => {
        localStorage.removeItem('token');
        window.location = '/';
    }

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
                            <img src={currentUser && 'http://localhost:3001/' + currentUser.userImage} style={{
                                width: 70,
                                height: 70,
                                borderRadius: '50%',
                                position: "absolute",
                                top: -15,
                                right: 5
                            }} alt="User"/>
                            <div className="user-popover-topside-info-inner">
                                <div>{currentUser && currentUser.name}</div>
                                <div className="font-sm">{currentUser && currentUser.email}</div>
                            </div>
                        </div>
                        <div className="user-popover-topside-account">
                            {`مانده اعتبار: ${currentUser && currentUser.account} تومان`}
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
                        }} variant="text" onClick={() => navigate('../account')}>
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
                        }} variant="text" onClick={handleLogOut}>
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