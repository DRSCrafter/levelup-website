import '../../Styles/Components/cardSwiper.css';
import React from "react";
import BannerCard from "./bannerCard";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Pagination} from "swiper";

function Banner({data}) {
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
                {data.map(item => (<SwiperSlide><BannerCard data={item}/></SwiperSlide>))}
            </Swiper>
        </>
    );
}

export default Banner;