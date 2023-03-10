import '../Styles/layout/loading.css';
import React from 'react';
import LottieLoader from "../Utils/lottieLoader";

import loading from '../Assets/loader.json';

function Loading({isLoading}: {isLoading: boolean}) {
    return (
        <div className={`loading-root ${!isLoading && 'disabled'}`}>
            <div className="loading-animation-container">
                <LottieLoader animationData={loading} speed={1.5}/>
            </div>
            <span className="loading-text">
                لطفا شکیبا باشید...
            </span>
        </div>
    );
}

export default Loading;