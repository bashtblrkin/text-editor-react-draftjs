import React from 'react';
import {useEditorApi} from "../TextEditor";
import cn from "classnames";
import {getEntityRange} from '../utils'
import Autocomplete from '@mui/material/Autocomplete';

import './ToolTip.scss';
import {EntityType} from "../TextEditor/config";
import {EditorState, Modifier} from "draft-js";


const options = ['Подкарантинная продукция', 'Подкарантинный объект']

const ToolTip = () => {

    const {toolTip, state, onChange} = useEditorApi();
    const [inputValue, setInputValue] = React.useState('')

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            let {currentEntity} = toolTip
            let selection = state.getSelection()

            if (currentEntity) {
                const entityRange = getEntityRange(state, currentEntity)
                const isBackward = selection.getIsBackward()
                if (isBackward) {
                    selection = selection.merge({
                        anchorOffset: entityRange?.end,
                        focusOffset: entityRange?.start,
                    });
                } else {
                    selection = selection.merge({
                        anchorOffset: entityRange?.start,
                        focusOffset: entityRange?.end,
                    });
                }
            }

            const entityKey = state
                .getCurrentContent()
                .createEntity(EntityType.typed, 'MUTABLE', {
                    selectionType: inputValue
                })
                .getLastCreatedEntityKey()

            let contentState = Modifier.replaceText(
                state.getCurrentContent(),
                selection,
                `${toolTip.text}`,
                state.getCurrentInlineStyle(),
                entityKey
            )

            let newEditorState = EditorState.push(
                state,
                contentState,
                'insert-characters'
            )

            selection = newEditorState.getSelection().merge({
                anchorOffset: selection.get('anchorOffset') + toolTip.text.length,
                focusOffset: selection.get('anchorOffset') + toolTip.text.length,
            })
            newEditorState = EditorState.acceptSelection(newEditorState, selection)
            contentState = Modifier.insertText(
                newEditorState.getCurrentContent(),
                selection,
                ' ',
                newEditorState.getCurrentInlineStyle(),
                undefined
            )
            onChange(EditorState.push(newEditorState, contentState, 'insert-characters'))
        }
    }

    return (
        <>
            {toolTip.show ?
                <div
                    className={cn('tooltip')}
                    style={toolTip.position}
                >
                    <Autocomplete
                        options={options}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue)
                        }}
                        onKeyPress={handleKeyPress}
                        renderInput={(params) =>
                            <div ref={params.InputProps.ref}>
                                <input
                                       type="text"
                                       {...params.inputProps}
                                />
                            </div>
                        }
                    />

                </div> : null}
        </>
    );
};

export default ToolTip;