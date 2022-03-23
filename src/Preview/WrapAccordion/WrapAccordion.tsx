import React, { FC } from 'react';

import './WrapAccordion.scss'

const WrapAccordion: FC<{children: JSX.Element}> = ({children}) => {
    return (
        <div className="accordion-wrap">
            {children}
        </div>
    );
};

export default WrapAccordion;