import '../Styles/Pages/cartPage.scss';
import React, {useContext, useEffect} from 'react';
import UserContext from "../Context/userContext.js";
import {DeleteOrder} from "../Utils/orderHandling";
import ContentContainer from "../layout/contentContainer.js";

import {Button, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import httpConnection from "../Utils/http";
import {useLoadingContext} from "react-router-loading";

import buttonStyles from '../Styles/MUI/button.style';

function CartPage() {
    const {user, handleUpdateUser} = useContext(UserContext);

    const loadingContext = useLoadingContext();

    const shoppingCart = user && user.shoppingCart;

    const handleSubmitCart = async () => {
        const backup = [...user.shoppingCart];
        try {
            handleUpdateUser('shoppingCart', []);
            await httpConnection.put(`/users/${user._id}/shoppingCart`, {});
            (window as Window).location = '/';
        } catch (ex) {
            handleUpdateUser('shoppingCart', backup);
        }
    }

    const handleClearCart = async () => {
        const backup = [...user.shoppingCart];
        try {
            handleUpdateUser('shoppingCart', []);
            await httpConnection.delete(`/users/${user._id}/shoppingCart`);
            (window as Window).location = '/';
        } catch (ex) {
            handleUpdateUser('shoppingCart', backup);
        }
    }

    useEffect(() => {
        loadingContext.done()
    }, []);

    return (
        <>
            <ContentContainer>
                <div className="orders__table--outer">
                    <div className="orders__table__header">
                        <div className="orders__table__header--inner"><h4>سبد خرید</h4></div>
                    </div>
                    <table className="orders__table--inner">
                        <tr>
                            <th>نام سفارش</th>
                            <th>تعداد</th>
                            <th>مبلغ کل</th>
                            <th>حذف</th>
                        </tr>
                        {shoppingCart && shoppingCart.map(item => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.totalPrice}</td>
                                <td>
                                    <IconButton
                                        style={{color: '#FF9797'}}
                                        size="small"
                                        onClick={() => DeleteOrder(user, handleUpdateUser, item)}
                                    >
                                        <DeleteIcon htmlColor="#FF0000"/>
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </table>
                    <div className="orders__button__section">
                        <span style={{margin: "auto"}}>
                            <Button
                                style={{
                                    ...buttonStyles.base,
                                    ...buttonStyles.cartSecondaryButton
                                }}
                                startIcon={<RemoveShoppingCartIcon style={{marginLeft: 20}} onClick={handleClearCart}/>}
                                variant="text"
                            >
                                خالی کردن سبد
                            </Button>
                        </span>
                        <span style={{margin: "auto"}}>
                            <Button
                                variant="contained"
                                style={{
                                    ...buttonStyles.base,
                                    ...buttonStyles.cartPrimaryButton
                                }}
                                startIcon={<AccountBalanceWalletIcon style={{marginLeft: 20}}/>}
                                onClick={handleSubmitCart}
                            >
                                ثبت سفارش و پرداخت
                            </Button>
                        </span>
                    </div>
                </div>
            </ContentContainer>
        </>
    );
}

export default CartPage;