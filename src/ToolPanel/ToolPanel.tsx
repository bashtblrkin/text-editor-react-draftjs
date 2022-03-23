import * as React from "react";
import {useEditorApi} from "../TextEditor";
import {BlockType, InlineStyle} from "../TextEditor/config";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DropDownButton from './DropDownButton/DropDownButton';
import TableGrid from '../Controls/TableGrid/TableGrid';
import "./ToolPanel.scss";


const ToolPanel: React.FC = () => {
    const {
        toHtml,
        addLink,
        addSelectionType,
        toggleBlockType,
        currentBlockType,
        toggleInlineStyle,
        hasInlineStyle,
        getViewObject
    } = useEditorApi();

    return (
        <Stack direction="row" spacing={2}>
            <button
                className={`${currentBlockType === BlockType.h1 ? 'tool-panel__item_active' : 'tool-panel__item'}`}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.h1);
                }}
            >
                Заголовок
            </button>
            <button
                className={`${currentBlockType === BlockType.h2 ? 'tool-panel__item_active' : 'tool-panel__item'}`}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.h2);
                }}
            >
                Подзаголовок
            </button>
            <button
                className={`${currentBlockType === BlockType.cite ? 'tool-panel__item_active' : 'tool-panel__item'}`}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.cite);
                }}
            >
                Сноска
            </button>
            <button
                className={`${currentBlockType === BlockType.default ? 'tool-panel__item_active' : 'tool-panel__item'}`}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.default);
                }}
            >
                Простой
            </button>

            {Object.values(InlineStyle).map((v) => (
                <button
                    className={`${hasInlineStyle(v) ? 'tool-panel__item_active' : 'tool-panel__item'}`}
                    key={v}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleInlineStyle(v);
                    }}
                >
                    {v}
                </button>
            ))}

            <button
                className="tool-panel__item"
                onClick={() => {
                    const url = prompt("URL:");
                    if (url) {
                        addLink(url);
                    }
                }}
            >
                LINK
            </button>

            <button
                className="tool-panel__item"
                onClick={() => {
                    const type = prompt("Тип:");
                    if (type) {
                        addSelectionType(type);
                    }
                }}
            >
                Добавить тип
            </button>

            <DropDownButton
                button={(handleClick) =>
                    <button className="tool-panel__item" onClick={handleClick}>
                        Добавить таблицу
                    </button>
                }
                renderElement={(toggleOpen) => <TableGrid toggleOpen={toggleOpen}/>}
            />

            <button
                className="tool-panel__item"
                onClick={() => {
                    console.log(toHtml());
                }}
            >
                Print
            </button>

            <button
                className="tool-panel__item"
                onClick={getViewObject}
            >
                View
            </button>
        </Stack>
    );
};

export default ToolPanel;
