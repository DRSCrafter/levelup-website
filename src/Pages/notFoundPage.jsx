import '../Styles/Pages/notFoundPage.css';
import React from 'react';

import LottieLoader from "../Utils/lottieLoader";
import notfound from '../Assets/notfound.json';

function NotFoundPage() {
    return (
        <>
            <div className="nfp-root">
                <div className="nfp-container">
                    <LottieLoader animationData={notfound} width={300} height={300}/>
                    <span>صفحه مورد نظر یافت نشد</span>
                </div>
            </div>
        </>
    );
}

export default NotFoundPage;