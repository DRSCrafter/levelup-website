import '../Styles/Pages/accountPage.scss';
import React, {useContext, useEffect} from 'react';
import ContentContainer from "../layout/contentContainer.js";
import Footer from "../layout/footer.js";

import {Button} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import UserContext from "../Context/userContext.js";
import AccountDialog from "../Components/Dialogs/accountDialog.js";
import httpConnection from "../Utils/http";
import {useLoadingContext} from "react-router-loading";

import buttonStyles from '../Styles/MUI/button.style';

function AccountPage() {
    const {user, handleUpdateUser} = useContext(UserContext);

    const [open, setOpen] = React.useState(false);

    const loadingContext = useLoadingContext();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChargeAccount = async (amount: number) => {
        const currentAmount = user.account;
        const request = JSON.stringify({
            amount: amount
        })

        try {
            handleUpdateUser('account', currentAmount + amount);

            await httpConnection.put(`/users/${user._id}/account`, request, {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
        } catch (ex) {
            handleUpdateUser('account', currentAmount);
        }

        handleClose();
    }

    useEffect(() => {
        loadingContext.done()
    }, []);

    return (
        <>
            <ContentContainer>
                <div className="user__root">
                    <div className="orders__table--outer">
                        <div className="orders__table__header">
                            <div className="orders__table__header--inner"><h4>سفارشات من</h4></div>
                        </div>
                        <table className="orders__table--inner">
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
                    <div className="account__user__info">
                        <div className="account__user__details">
                            <img src={user && `${user.userImage}`} className="account__user__image" alt="user image"/>
                            <div className="account__user__name">{user && user.name}</div>
                            <div className="account__user__email">{user && user.email}</div>
                        </div>
                        <div className="user__wallet">
                            <div className="user__wallet--inner">
                                <span>اعتبار فعلی شما:</span>
                                <span>{user && user.account} تومان</span>
                            </div>
                            <Button
                                variant="contained"
                                style={{
                                    ...buttonStyles.base,
                                    ...buttonStyles.dialogPrimary,
                                    ...{width: '100%'}
                                }}
                                startIcon={<AccountBalanceWalletIcon style={{marginLeft: 10}}/>}
                                onClick={handleClickOpen}
                            >
                                افزایش اعتبار
                            </Button>
                        </div>
                        <Button
                            variant="contained"
                            style={{
                                ...buttonStyles.base,
                                ...buttonStyles.dangerButton
                            }}
                            startIcon={<LogoutIcon style={{marginLeft: 10}}/>}
                        >
                            خروج از حساب کاربری
                        </Button>
                    </div>
                </div>
            </ContentContainer>
            <Footer/>
            <AccountDialog onClose={handleClose} open={open} onCharge={handleChargeAccount}/>
        </>
    );
}

export default AccountPage;
