import React from 'react';
import {useEditorApi} from "../TextEditor";
import cn from "classnames";
import {getEntityRange} from '../utils'
import Autocomplete from '@mui/material/Autocomplete';

import './ToolTip.scss';
import {EntityType} from "../TextEditor/config";
import {EditorState, Modifier} from "draft-js";


const types = [
    {sort: 'Требования к экспорту', title: 'Регионы'},
    {sort: 'Требования к экспорту', title: 'Регионы запрет'},
    {sort: 'Требования к экспорту', title: 'Контрагенты'},
    {sort: 'Требования к экспорту', title: 'Контрагенты запрет'},
    {sort: 'Требования к реэкспорту', title: 'Регионы'},
    {sort: 'Требования к реэкспорту', title: 'Регионы запрет'},
    {sort: 'Требования к реэкспорту', title: 'Контрагенты'},
    {sort: 'Требования к реэкспорту', title: 'Контрагенты запрет'},
    {sort: 'Требования к реэкспорту', title: 'Страны'},
    {sort: 'Требования к реэкспорту', title: 'Страны запрет'},
    {sort: 'Продукт', title: 'Наименование RUS'},
    {sort: 'Продукт', title: 'Наименование LAT'},
    {sort: 'Продукт', title: 'Документ'},
    {sort: 'Продукт', title: 'Документ запрет'},
    {sort: 'Документ', title: 'Род'},
    {sort: 'Документ', title: 'Группа'},
    {sort: 'Документ', title: 'Масса среднего образца'},
    {sort: 'Документ запрет', title: 'Род запрет'},
    {sort: 'Документ запрет', title: 'Группа запрет'},
    {sort: 'Документ запрет', title: 'Масса среднего образца запрет'},
    {sort: 'Сопроводительные документы', title: 'Основной сопроводительный документ'},
    {sort: 'Сопроводительные документы', title: 'Сопутствующий сопроводительный документ'},
    {sort: 'Сопроводительные документы', title: 'Прочий сопроводительный документ'},
    {sort: 'Сопроводительные документы запрет', title: 'Основной сопроводительный документ запрет'},
    {sort: 'Сопроводительные документы запрет', title: 'Сопутствующий сопроводительный документ запрет'},
    {sort: 'Сопроводительные документы запрет', title: 'Прочий сопроводительный документ запрет'},
    {sort: 'Упаковка', title: 'Упаковка'},
    {sort: 'Упаковка', title: 'Обработка упаковки'},
    {sort: 'Упаковка', title: 'Маркировка упаковки'},
    {sort: 'Упаковка запрет', title: 'Упаковка запрет'},
    {sort: 'Упаковка запрет', title: 'Обработка упаковки запрет'},
    {sort: 'Упаковка запрет', title: 'Маркировка упаковки запрет'},
    {sort: 'Другое', title: 'ТНВЭД'},
    {sort: 'Другое', title: 'ТНВЭД запрет'},
    {sort: 'Другое', title: 'Карантинные объекты'},
    {sort: 'Другое', title: 'Карантинные объекты запрет'},
    {sort: 'Другое', title: 'КФЗ'},
    {sort: 'Другое', title: 'Подкарантинные объекты'},
    {sort: 'Другое', title: 'Подкарантинные объекты запрет'},
    {sort: 'Другое', title: 'Методы отбора образцов'},
    {sort: 'Другое', title: 'Места ввоза запрет'},
    {sort: 'Другое', title: 'Страна'},
    {sort: 'Транзит', title: 'Условия транзита'},
    {sort: 'Транзит запрет', title: 'Условия транзита запрет'},
    {sort: 'Места ввоза', title: 'Место ввоза'},
    {sort: 'Места ввоза', title: 'с'},
    {sort: 'Места ввоза', title: 'по'},
    {sort: 'Места ввоза запрет', title: 'Место ввоза запрет'},
    {sort: 'Места ввоза запрет', title: 'с запрет'},
    {sort: 'Места ввоза запрет', title: 'по запрет'},
    {sort: 'Условия транспортировки', title: 'Условия'},
    {sort: 'Условия транспортировки', title: 'Примечание'},
    {sort: 'Условия транспортировки', title: 'Допускается экспорт ФСКС'},
    {sort: 'Условия транспортировки запрет', title: 'Условия запрет'},
    {sort: 'Условия транспортировки запрет', title: 'Примечание запрет'},
    {sort: 'Условия транспортировки запрет', title: 'Допускается экспорт ФСКС запрет'},
    {sort: 'Типы прочих объектов', title: 'Тип'},
    {sort: 'Типы прочих объектов запрет', title: 'Тип запрет'},
    {sort: 'Методы отбора образцов', title: 'Наименование'},
    {sort: 'Методы отбора образцов', title: 'Методы'},
]

const ToolTip = () => {

    const {toolTip, state, onChange} = useEditorApi();
    const [inputValue, setInputValue] = React.useState('')
    const [sortObj, setSortObj] = React.useState<{sort: string, title: string}>({sort: '', title: ''})

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
                    selectionType: inputValue,
                    sort: sortObj.sort,
                    text: toolTip.text
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
            /*updateSortedArray(sortObj, toolTip.text)*/
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
                        options={types}
                        groupBy={(option) => option.sort}
                        getOptionLabel={(option) => option.title}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue)
                        }}
                        onChange={(event: React.SyntheticEvent, value: {sort: string, title: string} | null, reason) => {
                            if (reason === 'selectOption') {
                                if (value) {
                                    setSortObj(value)
                                }
                            }
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