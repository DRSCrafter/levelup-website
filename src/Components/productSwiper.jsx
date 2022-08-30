import '../Styles/Components/productSwiper.css';
import "swiper/css/pagination";
import "swiper/css";

import React from "react";
import {Buy, Like} from "../Utils/productHandling";

import { Swiper, SwiperSlide } from "swiper/react";
import {useMediaQuery} from "@mui/material";

import ProductCard from "../Components/productCard";

function ProductSwiper({title, data}) {
    const matches = useMediaQuery('(min-width: 1024px)');

    return (
        <>
            <div className="product-swiper-container">
                <div className="product-swiper-header">
                    <span className="product-swiper-header-inner"><h4>{title}</h4></span>
                </div>
                <Swiper
                    slidesPerView={matches ? 5 : 3}
                    spaceBetween={3}
                    className="product-swiper"
                    preventClicks={false}
                    preventClicksPropagation={false}
                    noSwipingSelector={"button"}
                >
                    {data.map(item => (
                    <SwiperSlide>
                        <ProductCard info={item} onBuy={Buy} onLike={Like}/>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default ProductSwiper;