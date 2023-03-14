import '../../Styles/Components/Popovers/accountPopover.scss';
import React, {SetStateAction, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import PopoverContainer from "./popoverContainer";

import {Button, IconButton} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DeleteIcon from '@mui/icons-material/Delete';
import UserContext from "../../Context/userContext";
import ShopIcon from '@mui/icons-material/Shop';
import {DeleteOrder} from "../../Utils/orderHandling";
import Order from "../../types/context/order";

import buttonStyles from '../../Styles/MUI/button.style';
import iconStyles from '../../Styles/MUI/icon.style';

function AccountPopover() {
    const {user, handleUpdateUser, isLoggedIn} = useContext(UserContext);
    const [popAnchorEl2, setPopAnchorEl2] = useState(null);
    const navigate = useNavigate();
    const handlePopOver2 = (event: React.ChangeEvent<SetStateAction<any>>) => setPopAnchorEl2(event.currentTarget);

    const handleClosePopOver2 = () => setPopAnchorEl2(null);
    const openCart = Boolean(popAnchorEl2);

    const shoppingCardID = openCart ? 'shopping-card-popover' : undefined;

    const trimString = (string: string, length = 16) =>
        string.length > length ? string.substring(0, length) + '...' : string;

    const shoppingList = user && user.shoppingCart;
    // @ts-ignore
    const totalCost = shoppingList && shoppingList.reduce((a: number, b: Order) => a + b.totalPrice, 0);

    const handleNavigate = () => {
        handleClosePopOver2();
        navigate('/shoppingCart');
    }

    return (
        <>
            <IconButton className="navbar-icon-btn" aria-describedby={shoppingCardID} onClick={handlePopOver2}>
                <AccountBalanceWalletIcon htmlColor="var(--var-color-primary)"/>
            </IconButton>
            <PopoverContainer
                anchorEl={popAnchorEl2}
                onClose={handleClosePopOver2}
                open={openCart}
                id={shoppingCardID!}
            >
                {shoppingList && shoppingList.length !== 0 ?
                    <div className="account__popover">
                        <div className="account__popover__header">
                            <span>جمع کل سفارش ها:</span>
                            <span><>{user && totalCost} تومان</></span>
                        </div>
                        <div className="account__popover__footer">
                            {/*@ts-ignore*/}
                            {user && shoppingList.map((order: Order, index: number) => (
                                <div className="account__order" key={index}>
                                    <IconButton
                                        style={{color: 'var(--var-color-danger-background)'}}
                                        size="small"
                                        onClick={() => DeleteOrder(user, handleUpdateUser, order)}
                                    >
                                        <DeleteIcon htmlColor="var(--var-color-danger-text)"/>
                                    </IconButton>
                                    <span>{user && order.totalPrice} تومان</span>
                                    <span>
                                        <span>{user && trimString(order.name)}</span>
                                        <span>x{user && order.quantity}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="account__popover__button">
                            <Button
                                style={{
                                    ...buttonStyles.base,
                                    ...buttonStyles.popoverButton
                                } as React.CSSProperties}
                                variant="contained"
                                endIcon={<ShopIcon style={(iconStyles.buttonEnd as React.CSSProperties)}/>}
                                onClick={handleNavigate}>تکمیل خرید</Button>
                        </div>
                    </div>
                    :
                    <div className="account__popover">
                        <div className="account__popover--empty">
                            {isLoggedIn ? 'سبد خرید شما خالی است' : 'لطفا با حساب کاربری وارد شوید'}
                        </div>
                    </div>
                }
            </PopoverContainer>
        </>
    );
}

export default AccountPopover;