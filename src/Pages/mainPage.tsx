import React, {useContext, useEffect, useState} from 'react';
import ContentContainer from "../layout/contentContainer.js";
import UserContext from "../Context/userContext.js";
import httpConnection from "../Utils/http";
import ProductSwiper from "../Components/productSwiper.js";
import Banner from "../Components/Banner/banner.js";
import Footer from "../layout/footer.js";
import ProductSwiperProps from '../types/components/productSwiper';

function MainPage() {
    const [bannerList, setBannerList] = useState([]);
    const [swiperList, setSwiperList] = useState(([] as ProductSwiperProps[]));
    const {user} = useContext(UserContext);

    const handleGetData = async () => {
        const list = ([] as unknown as ProductSwiperProps[]);
        const topics = [
            {title: "تازه های کنسول", type: 'console'},
            {title: "تازه های بازی", type: 'game'},
        ];
        for (let topic of topics) {
            const request = {type: topic.type};
            const {data} = await httpConnection.put('/products/related', JSON.stringify(request), {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
            list.push({title: topic.title, data: data});
        }
        return list;
    }

    const handleGetBanners = async () => (await httpConnection.get('/banners')).data;

    useEffect(() => {
        handleGetBanners().then(res => setBannerList(res));
        handleGetData().then(res => setSwiperList(res));
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