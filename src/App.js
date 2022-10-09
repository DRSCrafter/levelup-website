import './Styles/global.css';
import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-loading';

import NavBar from "./layout/navBar";
import MainPage from "./Pages/mainPage";
import ProductsPage from "./Pages/productsPage";
import ItemPage from "./Pages/itemPage";
import LoginPage from "./Pages/loginPage";
import SignupPage from "./Pages/signupPage";
import AccountPage from "./Pages/accountPage";
import httpConnection from "./Utils/httpConnection";
import jwtDecode from "jwt-decode";
import UserContext from "./Context/userContext";
import CartPage from "./Pages/cartPage";
import SearchPage from "./Pages/searchPage";
import Loading from "./layout/loading";
import {toast, ToastContainer} from "react-toastify";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLoginUser = async () => {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) {
            toast.warn('برای بهره مندی از خدمات سایت وارد شوید');
            const defaultUser = {
                name: "کاربر میهمان",
                userImage: require('./Assets/defaultUser.png'),
            }
            return setUser(defaultUser);
        }
        const userID = jwtDecode(jwtToken)._id;
        const {data} = await httpConnection.get(`/users/${userID}`);
        const userImage = data.userImage ? data.userImage : require('./Assets/defaultUser.png');
        setUser({...data, userImage});
    }

    useEffect(() => {
        handleLoginUser().then(() => setLoading(false));
    }, []);

    const handleUpdateUser = (key, value) => setUser({...user, [key]: value});

    const isLoggedIn = Boolean(localStorage.getItem('token'));

    return (
        <>
                <UserContext.Provider value={{user, handleUpdateUser, isLoggedIn}}>
                    <Loading isLoading={loading}/>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/cat/:category" element={<ProductsPage/>} loading/>
                        <Route path="/products/:id" element={<ItemPage/>} loading/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/account" element={<AccountPage/>} loading/>
                        <Route path="/shoppingCart" element={<CartPage/>} loading/>
                        <Route path="/search" element={<SearchPage/>}/>
                    </Routes>
                    <ToastContainer toastClassName="toast-style"/>
                </UserContext.Provider>
        </>
    );
}

export default App;
