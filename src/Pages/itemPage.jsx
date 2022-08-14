import '../Styles/Components/ProductPlate.css';
import React from "react";
import ProductPlate from "../Components/productPlate";
import ProductSwiper from "../Components/productSwiper";
import ContentContainer from "../Components/ContentContainer";
import NavBar from "../Components/navBar";
import Footer from "../Components/Footer";

function ItemPage() {

    return (
        <>
            <NavBar/>
            <ContentContainer>
                <ProductPlate/>
                <ProductSwiper/>
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default ItemPage;
