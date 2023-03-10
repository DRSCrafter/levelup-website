import '../../Styles/Components/Banner/bannerCard.css';
import React from 'react';
import {useNavigate} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Banner from "../../types/context/banner";
import placeholder from '../../Assets/bannerholder.jpg';

function BannerCard({data}: { data: Banner }) {
    const navigate = useNavigate();
    const handleNavigate = () => navigate(`products/${productID}`);

    const {name, bannerImage, productID} = data;

    return (
        <>
            <div className="banner-card-container" onClick={handleNavigate}>
                <div className="banner-card-image-container">
                    <LazyLoadImage
                        src={bannerImage}
                        placeholderSrc={placeholder}
                        width={'100%'}
                        height={'100%'}
                        alt="banner"
                    />
                </div>
                <div className="banner-card-footer">
                    <span className="banner-card-footer-title">{name}</span>
                </div>
            </div>
        </>
    );
}

export default BannerCard;