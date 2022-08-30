import {Route, Routes} from 'react-router-dom';
import React, {useEffect, useState} from 'react';

import NavBar from "./Components/navBar";
import MainPage from "./Pages/mainPage";
import ProductsPage from "./Pages/ProductsPage";
import ItemPage from "./Pages/itemPage";
import LoginPage from "./Pages/loginPage";
import SignUpPage from "./Pages/signUpPage";
import AccountPage from "./Pages/accountPage";
import httpConnection from "./Utils/httpConnection";
import jwtDecode from "jwt-decode";
import UserContext from "./Context/userContext";
import ShoppingCartPage from "./Pages/shoppingCartPage";
import SearchPage from "./Pages/searchPage";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function loginUser() {
            const jwtToken = localStorage.getItem('token');
            if (!jwtToken) return;
            const userID = jwtDecode(jwtToken)._id;
            const user = await httpConnection.get('http://localhost:3001/api/users/' + userID);
            setUser(user.data);
        }

        loginUser();
    }, []);

    const handleUpdateUser = (key, value) => setUser({...user, [key]: value});

    return (
        <>
            <UserContext.Provider value={{user, handleUpdateUser}}>
                <NavBar/>
                <Routes>
                    <Route path="/" force element={<MainPage/>}/>
                    <Route path="/cat/:category" element={<ProductsPage/>}/>
                    <Route path="/products/:id" element={<ItemPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/account" element={<AccountPage/>}/>
                    <Route path="/shoppingCart" element={<ShoppingCartPage/>}/>
                    <Route path="/search" element={<SearchPage/>}/>
                </Routes>
            </UserContext.Provider>
        </>
    );
}

export default App;
