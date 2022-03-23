import React, {FC} from 'react';

import './DropDownElement.scss';

interface DropDownElementProps {
    children?: JSX.Element
}

const DropDownElement: FC<DropDownElementProps> = ({children}) => {

    return (
        <div className="dropdown-wrap">
            {children}
        </div>
    );
};

export default DropDownElement;