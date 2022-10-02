import '../Styles/Pages/cartPage.css';
import React, {useContext} from 'react';
import UserContext from "../Context/userContext";
import {DeleteOrder} from "../Utils/orderHandling";
import ContentContainer from "../layout/contentContainer";

import {Button, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import httpConnection from "../Utils/httpConnection";

const {apiEndpoint} = require('../config/config.json');

function CartPage() {
    const {user, handleUpdateUser} = useContext(UserContext);

    const shoppingCart = user && user.shoppingCart;

    const handleSubmitCart = async () => {
        const backup = [...user.shoppingCart];
        try {
            handleUpdateUser('shoppingCart', []);
            await httpConnection.put(`${apiEndpoint}/api/users/${user._id}/shoppingCart`, {});
            window.location = '/';
        } catch (ex) {
            handleUpdateUser('shoppingCart', backup);
        }
    }

    const handleClearCart = async () => {
        const backup = [...user.shoppingCart];
        try {
            handleUpdateUser('shoppingCart', []);
            await httpConnection.delete(`${apiEndpoint}/api/users/${user._id}/shoppingCart`);
            window.location = '/';
        } catch (ex) {
            handleUpdateUser('shoppingCart', backup);
        }
    }

    return (
        <>
            <ContentContainer>
                <div className="orders-table-container-outer">
                    <div className="orders-table-header">
                        <div className="orders-table-header-inner"><h4>سبد خرید</h4></div>
                    </div>
                    <table className="orders-table-container-inner">
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
                                    <IconButton style={{color: '#FF9797'}} size="small"
                                                onClick={() => DeleteOrder(user, handleUpdateUser, item)}>
                                        <DeleteIcon htmlColor="#FF0000"/>
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </table>
                    <div className="orders-btn-section">
                        <span style={{margin: "auto"}}>
                            <Button style={{
                                width: '100%',
                                height: '50px',
                                color: 'rgba(255,0,0,0.55)',
                                fontFamily: '"B Yekan"',
                                borderRadius: 0,
                                boxShadow: "none"
                            }} startIcon={<RemoveShoppingCartIcon style={{marginLeft: 20}} onClick={handleClearCart}/>}
                                    variant="text">
                                خالی کردن سبد
                            </Button>
                        </span>
                        <span style={{margin: "auto"}}>
                            <Button style={{
                                width: '100%',
                                height: '50px',
                                backgroundColor: '#98CCFF',
                                color: '#0080FF',
                                fontFamily: '"B Yekan"',
                                borderRadius: 0,
                                boxShadow: "none"
                            }} startIcon={<AccountBalanceWalletIcon style={{marginLeft: 20}}/>}
                                    onClick={handleSubmitCart} variant="contained">
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