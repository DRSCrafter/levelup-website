import React, {useContext, useEffect, useState} from 'react';
import ContentContainer from "../Components/ContentContainer";
import UserContext from "../Context/userContext";
import httpConnection from "../Utils/httpConnection";
import ProductSwiper from "../Components/productSwiper";
import Banner from "../Components/banner";
import Footer from "../Components/Footer";

const {apiEndpoint} = require('../config/config.json');

function MainPage() {
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
            const {data} = await httpConnection.put(`${apiEndpoint}products/related`, JSON.stringify(request), {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
            list.push({title: topic.title, data: data});
        }
        setSwiperList(list);
    }

    useEffect(() => {
        handleGetData();
    }, [user])
    return (
        <>
            <ContentContainer>
                <Banner/>
                {swiperList && swiperList.map((list, index) => (
                    <ProductSwiper title={list.title} data={list.data} key={index}/>
                ))}
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default MainPage;