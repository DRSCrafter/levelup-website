import '../../Styles/Components/Popovers/userPopover.css';
import React, {useContext, useState} from 'react';
import PopoverContainer from "./popoverContainer";

import {Button, IconButton} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from "@mui/icons-material/Person";
import UserContext from "../../Context/userContext";
import {useNavigate} from "react-router-dom";
import {Logout} from "../../Utils/userHandling";

function UserPopover() {
    const {user, isLoggedIn} = useContext(UserContext);

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

    return (
        <>
            <IconButton style={{marginRight: 10}} className="navbar-icon-btn" aria-describedby={userID}
                        onClick={handlePopOver1}>
                <PersonIcon htmlColor="#0080FF"/>
            </IconButton>
            <PopoverContainer anchorEl={popAnchorEl1} onClose={handleClosePopOver1} open={openUser} id={userID}>
                <div className="user-popover-container">
                    <div className="user-popover-topside">
                        <div className="user-popover-topside-info">
                            <img src={user && user.userImage}
                                 className="user-popover-image" alt="User"/>
                            <div className="user-popover-topside-info-inner">
                                <div>{user && user.name}</div>
                                <div className="font-sm">{user && user.email}</div>
                            </div>
                        </div>
                        {isLoggedIn && <div className="user-popover-topside-account">
                            {`مانده اعتبار: ${user && user.account} تومان`}
                        </div>}
                    </div>
                    <div className="user-popover-downside">
                        {isLoggedIn ?
                            <>
                                <Button style={styles.button} variant="text" onClick={() => navigate('../account')}>
                                    <ShoppingCartOutlinedIcon style={{marginLeft: 15}}/>
                                    سفارشات من
                                </Button>
                                <Button style={styles.button} variant="text" onClick={Logout}>
                                    <LogoutIcon style={{marginLeft: 15}}/>
                                    خروج از حساب کاربری
                                </Button>
                            </> :
                            <>
                                <Button style={styles.button} variant="text" onClick={() => navigate('../login')}>
                                    <LoginIcon style={{marginLeft: 15}}/>
                                    ورود و یا ثبت نام
                                </Button>
                            </>
                        }
                    </div>
                </div>
            </PopoverContainer>
        </>
    );
}

const styles = {
    button: {
        padding: 10,
        width: '100%',
        display: "flex",
        justifyContent: "flex-start",
        color: '#707070',
        fontFamily: 'Segoe UI Light',
    }
}

export default UserPopover;