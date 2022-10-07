import '../../Styles/Components/Banner/bannerCard.css';
import React from 'react';
import {useNavigate} from "react-router-dom";

function BannerCard({data}) {
    const navigate = useNavigate();
    const handleNavigate = () => navigate(`products/${productID}`);

    const {name, bannerImage, productID} = data;

    return (
        <>
            <div className="banner-card-container" onClick={handleNavigate}>
                <img src={bannerImage} className="ban" alt="banner"/>
                <div className="banner-card-footer">
                    <span className="banner-card-footer-title">{name}</span>
                </div>
            </div>
        </>
    );
}

export default BannerCard;