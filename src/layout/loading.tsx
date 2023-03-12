import '../Styles/layout/loading.scss';
import React from 'react';
import LottieLoader from "../Utils/lottieLoader";

import loading from '../Assets/loader.json';

function Loading({isLoading}: {isLoading: boolean}) {
    return (
        <div className={`loading ${!isLoading && 'loading--disabled'}`}>
            <div className="loading__animation">
                <LottieLoader animationData={loading} speed={1.5}/>
            </div>
            <span className="loading__text">
                لطفا شکیبا باشید...
            </span>
        </div>
    );
}

export default Loading;