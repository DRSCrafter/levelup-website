import '../../Styles/Components/Popovers/userPopover.scss';
import React, {SetStateAction, useContext, useState} from 'react';
import PopoverContainer from "./popoverContainer.js";

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

    const handlePopOver1 = (event: React.ChangeEvent<SetStateAction<any>>) => setPopAnchorEl1(event.currentTarget);
    const handleClosePopOver1 = () => setPopAnchorEl1(null);

    const openUser = Boolean(popAnchorEl1);
    const userID = openUser ? 'user-popover' : undefined;

    const handleNavigate = (section: string) => {
        handleClosePopOver1();
        navigate(section);
    }

    return (
        <>
            <IconButton
                style={{marginRight: 10}}
                className="navbar-icon-btn"
                aria-describedby={userID}
                onClick={handlePopOver1}
            >
                <PersonIcon htmlColor="var(--var-color-primary)"/>
            </IconButton>
            <PopoverContainer
                anchorEl={popAnchorEl1}
                onClose={handleClosePopOver1}
                style={{overflow: 'visible'}}
                paperProps={{input: {overflow: 'visible'}}}
                open={openUser}
                id={userID!}
            >
                <div className="user__popover">
                    <div className="user__popover__header">
                        <div className="user__popover__header__content">
                            <img
                                src={user?.userImage}
                                className="user__popover__image"
                                alt="User"
                            />
                            <div className="user__popover__header__content--inner">
                                <div>{user?.name}</div>
                                <div className="font-sm">{user && user.email}</div>
                            </div>
                        </div>
                        {isLoggedIn && <div className="user-popover-topside-account">
                            {`مانده اعتبار: ${user?.account} تومان`}
                        </div>}
                    </div>
                    <div className="user-popover-downside">
                        {isLoggedIn ?
                            <>
                                <Button
                                    style={styles.button}
                                    variant="text"
                                    onClick={() => handleNavigate('../account')}
                                >
                                    <ShoppingCartOutlinedIcon style={{marginLeft: 15}}/>
                                    سفارشات من
                                </Button>
                                <Button style={styles.button} variant="text" onClick={Logout}>
                                    <LogoutIcon style={{marginLeft: 15}}/>
                                    خروج از حساب کاربری
                                </Button>
                            </> :
                            <>
                                <Button style={styles.button} variant="text" onClick={() => handleNavigate('/login')}>
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
        color: 'var(--var-color-gray)',
        fontFamily: 'Segoe UI Light',
    }
}

export default UserPopover;