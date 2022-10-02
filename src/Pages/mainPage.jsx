import React, {useContext, useEffect, useState} from 'react';
import ContentContainer from "../Components/ContentContainer";
import UserContext from "../Context/userContext";
import httpConnection from "../Utils/httpConnection";
import ProductSwiper from "../Components/productSwiper";
import Banner from "../Components/banner";
import Footer from "../Components/Footer";

const {apiEndpoint} = require('../config/config.json');

function MainPage() {
    const [bannerList, setBannerList] = useState([]);
    const [swiperList, setSwiperList] = useState([]);
    const {user} = useContext(UserContext);

    const handleGetData = async () => {
        const list = [];
        const topics = [
            {title: "تازه های بازی", type: 'game'},
            {title: "تازه های کنسول", type: 'console'},
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
        handleGetData();
        handleGetBanners();
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