import '../Styles/Components/productSwiper.scss';
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
            <div className="product__swiper__root">
                <div className="product__swiper__header">
                    <span className="product__swiper__header--inner"><h4>{title}</h4></span>
                </div>
                <Swiper
                    slidesPerView={matches ? 5 : 2}
                    spaceBetween={3}
                    className="product__swiper"
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