import '../Styles/layout/notFound.scss';
import React from 'react';
import MoodBadIcon from "@mui/icons-material/MoodBad";

function NotFound() {
    return (
        <>
            <div className="not-found">
                <div className="not-found__content">
                    <MoodBadIcon/>
                    <div>متاسفانه هیچ موردی یافت نشد</div>
                </div>
            </div>
        </>
    );
}

export default NotFound;