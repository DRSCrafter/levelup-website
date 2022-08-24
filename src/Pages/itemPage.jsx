import '../Styles/Components/ProductPlate.css';
import React from "react";

import ProductPlate from "../Components/productPlate";
import ProductSwiper from "../Components/productSwiper";
import ContentContainer from "../Components/ContentContainer";
import Footer from "../Components/Footer";

function ItemPage() {

    return (
        <>
            <ContentContainer>
                <ProductPlate/>
                <ProductSwiper/>
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default ItemPage;
