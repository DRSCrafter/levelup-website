import '../Styles/Pages/notFoundPage.scss';
import React from 'react';

import LottieLoader from "../Utils/lottieLoader";
import notfound from '../Assets/notfound.json';

function NotFoundPage() {
    return (
        <>
            <div className="not-found__page">
                <div className="not-found__content">
                    <LottieLoader animationData={notfound} width={300} height={300}/>
                    <span>صفحه مورد نظر یافت نشد</span>
                </div>
            </div>
        </>
    );
}

export default NotFoundPage;