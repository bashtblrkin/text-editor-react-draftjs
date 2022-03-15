import * as React from "react";
import {useEditorApi} from "../TextEditor";
import cn from "classnames";
import {BlockType, InlineStyle} from "../TextEditor/config";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import "./ToolPanel.scss";

const ToolPanel: React.FC = () => {
    const {
        toHtml,
        addLink,
        addSelectionType,
        toggleBlockType,
        currentBlockType,
        toggleInlineStyle,
        hasInlineStyle
    } = useEditorApi();

    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant={`${currentBlockType === BlockType.h1 ? 'contained' : 'outlined'}`}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.h1);
                }}
            >
                Заголовок
            </Button>
            <Button
                variant={`${currentBlockType === BlockType.h2 ? 'contained' : 'outlined'}`}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.h2);
                }}
            >
                Подзаголовок
            </Button>
            <Button
                variant={`${currentBlockType === BlockType.cite? 'contained' : 'outlined'}`}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.cite);
                }}
            >
                Сноска
            </Button>
            <Button
                variant={`${currentBlockType === BlockType.default ? 'contained' : 'outlined'}`}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.default);
                }}
            >
                Простой
            </Button>

            {Object.values(InlineStyle).map((v) => (
                <Button
                    variant={`${hasInlineStyle(v) ? 'contained' : 'outlined'}`}
                    key={v}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleInlineStyle(v);
                    }}
                >
                    {v}
                </Button>
            ))}

            <Button
                variant="outlined"
                className="tool-panel__item"
                onClick={() => {
                    const url = prompt("URL:");
                    if (url) {
                        addLink(url);
                    }
                }}
            >
                LINK
            </Button>

            <Button
                variant="outlined"
                className="tool-panel__item"
                onClick={() => {
                    const type = prompt("Тип:");
                    if (type) {
                        addSelectionType(type);
                    }
                }}
            >
                Добавить тип
            </Button>

            <Button
                variant="outlined"
                className="tool-panel__item"
                onClick={() => {
                    console.log(toHtml());
                }}
            >
                Print
            </Button>
        </Stack>
    );
};

export default ToolPanel;
