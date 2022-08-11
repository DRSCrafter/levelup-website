import '../Styles/Components/bannerCard.css';
import React from 'react';

function BannerCard({name, image}) {
    return (
        <>
            <div className="banner-card-container">
                <img src={image} className="ban" alt="banner"/>
                <div className="banner-card-footer">
                    <span className="banner-card-footer-title">{name}</span>
                </div>
            </div>
        </>
    );
}

export default BannerCard;