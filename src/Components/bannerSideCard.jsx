import '../Styles/Components/bannerSideCard.css';
import React from 'react';

function BannerSideCard({image}) {
    return (
        <>
            <div style={{width: '100%', height: '100%'}}>
                <img src={image} className="banner-side-image" alt="banner"/>
            </div>
        </>
    );
}

export default BannerSideCard;