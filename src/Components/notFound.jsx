import '../Styles/Components/notFound.css';
import React from 'react';
import MoodBadIcon from "@mui/icons-material/MoodBad";

function NotFound() {
    return (
        <>
            <div className="nf-root">
                <div className="nf-container">
                    <MoodBadIcon/>
                    <div>متاسفانه هیچ موردی یافت نشد</div>
                </div>
            </div>
        </>
    );
}

export default NotFound;