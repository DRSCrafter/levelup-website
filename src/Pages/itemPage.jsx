import '../Styles/Components/ProductPlate.css';
import React, {useContext, useEffect, useState} from "react";

import ProductPlate from "../Components/productPlate";
import ProductSwiper from "../Components/productSwiper";
import ContentContainer from "../Components/ContentContainer";
import Footer from "../Components/Footer";
import UserContext from "../Context/userContext";
import {useParams} from "react-router-dom";
import httpConnection from "../Utils/httpConnection";

const {apiEndpoint} = require('../config.json');

function ItemPage() {
    const [product, setProduct] = useState({});
    const [relatedList, setRelatedList] = useState([]);
    const {id} = useParams();

    const handleGetData = async () => {
        const item = await httpConnection.get(`${apiEndpoint}products/${id}`, {});
        console.log(item.data);
        setProduct(item.data);

        const request = JSON.stringify({
            type: item.data.type,
            category: item.data.category
        })
        const related = await httpConnection.put(`${apiEndpoint}products/related`, request, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
        console.log(related.data);
        setRelatedList(related.data);
    }

    useEffect(() => {
        handleGetData();
    }, []);

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
