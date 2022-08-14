import '../Styles/Components/account.css';
import React from 'react';
import ContentContainer from "../Components/ContentContainer";
import NavBar from "../Components/navBar";
import Footer from "../Components/Footer";

import {Button} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';

const data = [
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
    {name: "Halo Unlimited", date: '2022/03/07', quantity: 1, totalCost: '1,300,000'},
];

function AccountPage() {

    return (
        <>
            <NavBar/>
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
                            {data.map(item => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.date}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.totalCost}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                    <div className="user-info-container">
                        <div className="user-personal-info">
                            <div style={{width: 150, height: 150, backgroundColor: 'grey', borderRadius: 80}}/>
                            <div className="user-info-name">محمد رضا آراسته شاهراه</div>
                            <div className="user-info-email">drsprogramming2020@gmail.com</div>
                        </div>
                        <div className="user-wallet-container">
                            <div className="user-wallet-container-inner">
                                <span>اعتبار فعلی شما:</span>
                                <span>0 تومان</span>
                            </div>
                            <Button style={{
                                width: '100%',
                                backgroundColor: '#98CCFF',
                                color: '#0080FF',
                                fontFamily: '"B Yekan"'
                            }} startIcon={<AccountBalanceWalletIcon style={{marginLeft: 10}}/>} variant="contained">افزایش
                                اعتبار</Button>
                        </div>
                        <Button style={{
                            width: '75%',
                            backgroundColor: '#FF9797',
                            color: '#FF0000',
                            fontFamily: '"B Yekan"'
                        }} startIcon={<LogoutIcon style={{marginLeft: 10}}/>} variant="contained">خروج از حساب
                            کاربری</Button>
                    </div>
                </div>
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default AccountPage;
