import React, {useState, FC} from 'react';
import DropDownElement from '../DropDownElement/DropDownElement';
import './DropDownButton.scss';

interface DropDownButtonProps {
    button: (handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void) => JSX.Element
    renderElement: (props?: any) => JSX.Element
}

const DropDownButton: FC<DropDownButtonProps> = ({button, renderElement}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [positionElement, setPositionElement] = useState<{offsetLeft: number, offsetRight: number}>({
        offsetLeft: 0,
        offsetRight: 0
    })

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(open => !open)
    }

    return (
        <div style={{position: 'relative'}}>
            {button(handleClick)}
            {open && <DropDownElement>{renderElement(handleClick)}</DropDownElement>}
        </div>
    );
};

export default DropDownButton;