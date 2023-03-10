import '../Styles/Components/productSwiper.css';
import "swiper/css/pagination";
import "swiper/css";

import React from "react";

import {Swiper, SwiperSlide} from "swiper/react";
import {useMediaQuery} from "@mui/material";

import ProductCard from "./productCard.js";
import ProductSwiperProps from "../types/components/productSwiper";

function ProductSwiper({title, data}: ProductSwiperProps) {
    const matches = useMediaQuery('(min-width: 1024px)');

    return (
        <>
            <div className="product-swiper-container">
                <div className="product-swiper-header">
                    <span className="product-swiper-header-inner"><h4>{title}</h4></span>
                </div>
                <Swiper
                    slidesPerView={matches ? 5 : 2}
                    spaceBetween={3}
                    className="product-swiper"
                    preventClicks={false}
                    preventClicksPropagation={false}
                    noSwipingSelector={"button"}
                >
                    {data && data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard info={item}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default ProductSwiper;