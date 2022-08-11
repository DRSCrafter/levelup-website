import '../Styles/Components/banner.css';
import React from 'react';
import CardSwiper from "./cardSwiper";
import BannerSideCard from "./bannerSideCard";

const sideCards = [{image: require('../Assets/banner1.png')}, {image: require('../Assets/banner2.png')}];

function Banner() {
    return (
        <>
            <div className="banner-root">
                <div className="banner-grid">
                    <CardSwiper/>
                    <BannerSideCard image={sideCards[0].image}/>
                    <BannerSideCard image={sideCards[1].image}/>
                </div>
            </div>
        </>
    );
}

export default Banner;