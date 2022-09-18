import '../Styles/Components/ProductPlate.css';
import React, {useEffect, useState} from "react";

import ProductPlate from "../Components/productPlate";
import ProductSwiper from "../Components/productSwiper";
import ContentContainer from "../Components/ContentContainer";
import Footer from "../Components/Footer";
import {useParams} from "react-router-dom";
import httpConnection from "../Utils/httpConnection";
import "react-toastify/ReactToastify.min.css";
import {ToastContainer} from "react-toastify";

const {apiEndpoint} = require('../config.json');

function ItemPage() {
    const [product, setProduct] = useState({});
    const [relatedList, setRelatedList] = useState([]);
    const {id} = useParams();

    const handleGetData = async () => {
        const item = await httpConnection.get(`${apiEndpoint}products/${id}`, {});
        setProduct(item.data);

        const request = JSON.stringify({
            type: item.data.type,
            category: item.data.category
        })
        const related = await httpConnection.put(`${apiEndpoint}products/related`, request, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
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
            <ToastContainer position="bottom-right" newestOnTop/>
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default ItemPage;
