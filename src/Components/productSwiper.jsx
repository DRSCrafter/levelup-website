import '../Styles/Components/productSwiper.css';
import "swiper/css/pagination";
import "swiper/css";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {useMediaQuery} from "@mui/material";

import ProductCard from "../Components/productCard";

function ProductSwiper({title, data}) {
    const matches = useMediaQuery('(min-width: 1024px)');

    return (
        <>
            <div className="product-swiper-container">
                <div className="product-swiper-header">
                    <span className="product-swiper-header-inner"><h4>تازه های بازی</h4></span>
                </div>
                <Swiper
                    slidesPerView={matches ? 5 : 3}
                    spaceBetween={3}
                    className="product-swiper"
                    preventClicks={false}
                    preventClicksPropagation={false}
                    noSwipingSelector={"button"}
                >
                    <SwiperSlide><ProductCard/></SwiperSlide>
                    <SwiperSlide><ProductCard/></SwiperSlide>
                    <SwiperSlide><ProductCard/></SwiperSlide>
                    <SwiperSlide><ProductCard/></SwiperSlide>
                    <SwiperSlide><ProductCard/></SwiperSlide>
                    <SwiperSlide><ProductCard/></SwiperSlide>
                    <SwiperSlide><ProductCard/></SwiperSlide>
                    <SwiperSlide><ProductCard/></SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}

export default ProductSwiper;