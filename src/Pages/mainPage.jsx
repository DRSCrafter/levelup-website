import React, {useContext, useEffect, useState} from 'react';
import ContentContainer from "../layout/contentContainer";
import UserContext from "../Context/userContext";
import httpConnection from "../Utils/httpConnection";
import ProductSwiper from "../Components/productSwiper";
import Banner from "../Components/Banner/banner";
import Footer from "../layout/footer";
import {toast} from "react-toastify";

const {apiEndpoint} = require('../config/config.json');

function MainPage() {
    const [bannerList, setBannerList] = useState([]);
    const [swiperList, setSwiperList] = useState([]);
    const {user} = useContext(UserContext);

    const handleGetData = async () => {
        const list = [];
        const topics = [
            {title: "تازه های کنسول", type: 'console'},
            {title: "تازه های بازی", type: 'game'},
        ];
        for (let topic of topics) {
            const request = {type: topic.type};
            const {data} = await httpConnection.put(`${apiEndpoint}/api/products/related`, JSON.stringify(request), {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
            list.push({title: topic.title, data: data});
        }
        setSwiperList(list);
    }

    const handleGetBanners = async () => {
        const {data} = await httpConnection.get(`${apiEndpoint}/api/banners`);
        setBannerList(data);
    }

    useEffect(() => {
        handleGetBanners();
        handleGetData();
    }, [user])
    return (
        <>
            <ContentContainer>
                <Banner data={bannerList}/>
                {swiperList && swiperList.map((list, index) => (
                    <ProductSwiper {...list} key={index}/>
                ))}
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default MainPage;