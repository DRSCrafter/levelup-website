import {Route, Routes} from 'react-router-dom';
import React, {useEffect, useState} from 'react';

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

const {apiEndpoint} = require('./config/config.json');

function App() {
    const [user, setUser] = useState(null);

    const handleLoginUser = async () => {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) {
            const defaultUser = {
                name: "کاربر میهمان",
                userImage: require('./Assets/defaultUser.png'),
            }
            return setUser(defaultUser);
        }
        const userID = jwtDecode(jwtToken)._id;
        const {data} = await httpConnection.get(`${apiEndpoint}/api/users/${userID}`);
        const userImage = data.userImage ? data.userImage : require('./Assets/defaultUser.png');
        setUser({...data, userImage});
    }

    useEffect(() => {
        handleLoginUser();
    }, []);

    const handleUpdateUser = (key, value) => setUser({...user, [key]: value});

    const isLoggedIn = Boolean(localStorage.getItem('token'));

    return (
        <>
            <UserContext.Provider value={{user, handleUpdateUser, isLoggedIn}}>
                <NavBar/>
                <Routes>
                    <Route path="/" force element={<MainPage/>}/>
                    <Route path="/cat/:category" element={<ProductsPage/>}/>
                    <Route path="/products/:id" element={<ItemPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/account" element={<AccountPage/>}/>
                    <Route path="/shoppingCart" element={<CartPage/>}/>
                    <Route path="/search" element={<SearchPage/>}/>
                </Routes>
            </UserContext.Provider>
        </>
    );
}

export default App;
