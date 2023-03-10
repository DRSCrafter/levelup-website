import '../Styles/layout/contentContainer.css';
import React from 'react';

function ContentContainer({children}: { children: React.ReactNode }) {
    return (
        <div className="content-container">
            {children}
        </div>
    );
}

export default ContentContainer;