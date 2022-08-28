import '../Styles/Components/accountPopover.css';
import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import IconPopOver from "./iconPopOver";

import {Button, IconButton} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DeleteIcon from '@mui/icons-material/Delete';
import UserContext from "../Context/userContext";
import ShopIcon from '@mui/icons-material/Shop';
import {handleDeleteOrder} from "../Utils/orderHandling";

function AccountPopover() {
    const navigate = useNavigate();

    const [popAnchorEl2, setPopAnchorEl2] = useState(null);

    const handlePopOver2 = (event) => {
        setPopAnchorEl2(event.currentTarget);
    }
    const handleClosePopOver2 = () => {
        setPopAnchorEl2(null);
    }

    const openCart = Boolean(popAnchorEl2);
    const shoppingCardID = openCart ? 'shopping-card-popover' : undefined;

    const trimString = (string, length = 16) =>
        string.length > length ? string.substring(0, length) + '...' : string;

    const {user, handleUpdateUser} = useContext(UserContext);

    const shoppingList = user && user.shoppingCart;
    const totalCost = shoppingList && shoppingList.reduce((a, b) => a + b.totalPrice, 0);

    const handleNavigate = () => {
        handleClosePopOver2();
        navigate('../shoppingCart');
    }

    return (
        <>
            <IconButton className="navbar-icon-btn" aria-describedby={shoppingCardID} onClick={handlePopOver2}>
                <AccountBalanceWalletIcon htmlColor="#0080FF"/>
            </IconButton>
            <IconPopOver anchorEl={popAnchorEl2} onClose={handleClosePopOver2} open={openCart} id={shoppingCardID}>
                {shoppingList && shoppingList.length !== 0 ?
                    <div className="account-popover-container">
                        <div className="account-popover-topside">
                            <span>جمع کل سفارش ها:</span>
                            <span>{user && totalCost} تومان</span>
                        </div>
                        <div className="account-popover-downside">
                            {user && shoppingList.map(order => (
                                <div className="account-order-container">
                                    <IconButton style={{color: '#FF9797'}} size="small"
                                                onClick={() => handleDeleteOrder(user, handleUpdateUser, order)}>
                                        <DeleteIcon htmlColor="#FF0000"/>
                                    </IconButton>
                                    <span>{user && order.totalPrice} تومان</span>
                                    <span>
                                        <span>{user && trimString(order.name)}</span>
                                        <span>x{user && order.quantity}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="account-popover-btn-container">
                            <Button
                                style={{
                                    width: '60%',
                                    borderRadius: 10,
                                    fontFamily: '"B Yekan", sans-serif',
                                    color: '#ffffff',
                                    position: "relative"
                                }}
                                variant="contained"
                                endIcon={<ShopIcon style={{position: "absolute", left: 30, top: 10}}/>}
                                onClick={handleNavigate}>تکمیل خرید</Button>
                        </div>
                    </div>
                    :
                    <div className="account-popover-container">
                        <div className="account-popover-empty">
                            سبد خرید شما خالی است
                        </div>
                    </div>
                }
            </IconPopOver>
        </>
    );
}

export default AccountPopover;