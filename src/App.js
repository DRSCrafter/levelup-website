import {Route, Routes} from 'react-router-dom';
import React from 'react';

import NavBar from "./Components/navBar";
import MainPage from "./Pages/mainPage";
import ProductsPage from "./Pages/ProductsPage";
import ItemPage from "./Pages/itemPage";
import LoginPage from "./Pages/loginPage";
import SignUpPage from "./Pages/signUpPage";
import AccountPage from "./Pages/accountPage";

function App() {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/cat/:category" element={<ProductsPage/>}/>
                <Route path="/products/:id" element={<ItemPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/account" element={<AccountPage/>}/>
            </Routes>
        </>
    );
}

export default App;
