import '../Styles/layout/contentContainer.scss';
import React from 'react';

function ContentContainer({children}: { children: React.ReactNode }) {
    return (
        <div className="content">
            {children}
        </div>
    );
}

export default ContentContainer;