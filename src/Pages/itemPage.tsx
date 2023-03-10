import '../Styles/Pages/itemPage.css';
import React, {useEffect, useState} from "react";

import ProductPlate from "../Components/productPlate.js";
import ProductSwiper from "../Components/productSwiper.js";
import ContentContainer from "../layout/contentContainer.js";
import Footer from "../layout/footer.js";
import {useParams} from "react-router-dom";
import "react-toastify/ReactToastify.min.css";
import {getFullProduct} from "../Utils/productHandling";
import {useLoadingContext} from "react-router-loading";
import Product from "../types/context/product";

function ItemPage() {
    const [product, setProduct] = useState(({} as Product));
    const [relatedList, setRelatedList] = useState([]);

    const {id} = useParams();

    const loadingContext = useLoadingContext();

    useEffect(() => {
        getFullProduct(id, setProduct, setRelatedList).then(() => loadingContext.done())
    }, [id]);

    return (
        <>
            <ContentContainer>
                <ProductPlate product={product}/>
                <ProductSwiper title="محصولات مرتبط" data={relatedList}/>
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default ItemPage;
