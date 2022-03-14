import {ContentBlock, ContentState} from "draft-js";
import * as React from "react";
import { useEditorApi } from "../context";
import './SelectionText.scss';

type SelectionTextProps = {
    children: React.ReactNode;
    contentState: ContentState;
    entityKey: string;
};

const SelectionText: React.FC<SelectionTextProps> = ({children, contentState, entityKey}) => {

    const {setEntityData} = useEditorApi();
    const {selectionType} = contentState.getEntity(entityKey).getData();

    const handlerClick = () => {
        const newType = prompt("Тип:", selectionType);
        if (newType) {
            setEntityData(entityKey, { selectionType: newType });
        }
    };

    return (
        <div className="selection-text_wrap">
            <p className="selection-text_type" onClick={handlerClick}>{selectionType}</p>
            <div className="selection-text" >
                {children}
            </div>
        </div>
    );
};

export default SelectionText;