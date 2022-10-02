import '../Styles/Components/account.css';
import React, {useContext} from 'react';
import ContentContainer from "../Components/ContentContainer";
import Footer from "../Components/Footer";

import {Button, useMediaQuery} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import UserContext from "../Context/userContext";
import AccountDialog from "../Components/accountDialog";
import httpConnection from "../Utils/httpConnection";

const {apiEndpoint} = require('../config/config.json');

function AccountPage() {
    const {user, handleUpdateUser} = useContext(UserContext);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChargeAccount = async (amount) => {
        const currentAmount = user.account;
        const request = JSON.stringify({
            amount: amount
        })

        try {
            handleUpdateUser('account', currentAmount + amount);

            await httpConnection.put(`${apiEndpoint}/api/users/${user._id}/account`, request, {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
        } catch (ex) {
            handleUpdateUser('account', currentAmount);
        }

        handleClose();
    }

    const isPC = useMediaQuery('(min-width: 1024px)');

    return (
        <>
            <ContentContainer>
                <div className="user-root">
                    <div className="orders-table-container-outer">
                        <div className="orders-table-header">
                            <div className="orders-table-header-inner"><h4>سفارشات من</h4></div>
                        </div>
                        <table className="orders-table-container-inner">
                            <tr>
                                <th>نام سفارش</th>
                                <th>تاریخ</th>
                                <th>تعداد</th>
                                <th>مبلغ کل</th>
                            </tr>
                            {user && user.order.map(item => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.date}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.totalPrice}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                    <div className="user-info-container">
                        <div className="user-personal-info">
                            <img src={user && `${user.userImage}`} style={{width: 150, height: 150, borderRadius: '50%'}}/>
                            <div className="user-info-name">{user && user.name}</div>
                            <div className="user-info-email">{user && user.email}</div>
                        </div>
                        <div className="user-wallet-container">
                            <div className="user-wallet-container-inner">
                                <span>اعتبار فعلی شما:</span>
                                <span>{user && user.account} تومان</span>
                            </div>
                            <Button style={{
                                width: '100%',
                                backgroundColor: '#98CCFF',
                                color: '#0080FF',
                                fontFamily: '"B Yekan"'
                            }} startIcon={<AccountBalanceWalletIcon style={{marginLeft: 10}}/>} variant="contained"
                                    onClick={handleClickOpen}>
                                افزایش اعتبار
                            </Button>
                        </div>
                        <Button style={{
                            width: '75%',
                            backgroundColor: '#FF9797',
                            color: '#FF0000',
                            fontFamily: '"B Yekan"'
                        }} startIcon={<LogoutIcon style={{marginLeft: 10}}/>} variant="contained">
                            خروج از حساب کاربری
                        </Button>
                    </div>
                </div>
            </ContentContainer>
            <Footer/>
            <AccountDialog onClose={handleClose} open={open} onCharge={handleChargeAccount} isPC={isPC}/>
        </>
    );
}

export default AccountPage;
