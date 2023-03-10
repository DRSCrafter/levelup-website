import '../../Styles/Components/cardSwiper.css';
import React from "react";
import BannerCard from "./bannerCard";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Pagination} from "swiper";
import BannerProps from "../../types/components/banner/bannerProps";

function Banner({data}: BannerProps) {
    return (
        <>
            <Swiper
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="card-swiper-container"
            >
                {data.map((item, index) => (<SwiperSlide key={index}><BannerCard data={item}/></SwiperSlide>))}
            </Swiper>
        </>
    );
}

export default Banner;