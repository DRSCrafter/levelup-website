import '../../Styles/Components/cardSwiper.css';
import React from "react";
import BannerCard from "./bannerCard";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Pagination} from "swiper";

const data = [
    // {name: "Super Mario Odyssey", image: require('../Assets/header1.jpg')},
    {name: "Splatoon 3", image: require('../Assets/header2.jpg')},
    {name: "Need For Speed Heat", image: require('../Assets/header3.jpg')},
    {name: "Marvel's Avengers", image: require('../Assets/header4.jpg')},
];

function CardSwiper() {
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
                {data.map(item => (<SwiperSlide><BannerCard name={item.name} image={item.image}/></SwiperSlide>))}
            </Swiper>
        </>
    );
}

export default CardSwiper;