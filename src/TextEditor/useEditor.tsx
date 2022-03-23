import {
    CompositeDecorator,
    DraftEntityMutability,
    DraftHandleValue,
    EditorState, Entity,
    getDefaultKeyBinding,
    KeyBindingUtil,
    RichUtils,
} from "draft-js";
// @ts-ignore
import React, {useState} from "react";
import {BlockType, EntityType, InlineStyle, KeyCommand} from "./config";
import {HTMLtoState, stateToHTML} from "./convert";
import LinkDecorator from "./Link";
import SelectedTextDecorator from './SelectionText';
import {getSelectionCoords, getSelectionRange, getSelectionText, getSelectionEntity, getEntities} from "../utils";
import {SortedArray, IObjectView} from '../interface/interface';

export type EditorApi = {
    state: EditorState;
    onChange: (state: EditorState) => void;
    toggleBlockType: (blockType: BlockType) => void;
    currentBlockType: BlockType;
    toHtml: () => string;
    toggleInlineStyle: (inlineStyle: InlineStyle) => void;
    hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
    addLink: (url: string) => void;
    addSelectionType: (type: string) => void;
    setEntityData: (entityKey: string, data: Record<string, string>) => void;
    handleKeyCommand: (
        command: KeyCommand,
        editorState: EditorState
    ) => DraftHandleValue;
    handlerKeyBinding: (e: React.KeyboardEvent) => KeyCommand | null;
    toolTip: InlineToolTip
  /*  updateSortedArray: (option: {sort: string, title: string}, value: string) => void*/
    sortedArray: SortedArray
    flowerObject: IObjectView[]
    getViewObject: () => void
};

const decorator = new CompositeDecorator([LinkDecorator, SelectedTextDecorator]);

export type InlineToolTip = {
    show: boolean
    text: string
    currentEntity?: Entity;
    position?: {
        top: number
        left: number
    }
}

export const useEditor = (html?: string): EditorApi => {

    const [state, setState] = useState(() =>
        html
            ? EditorState.createWithContent(HTMLtoState(html), decorator)
            : EditorState.createEmpty(decorator)
    );
    const [flowerObject, setFlowerObject] = useState<IObjectView[]>([])

    const [positionAutocomplete, setPositionAutocomplete] = useState<InlineToolTip>({
        show: false,
        text: '',
        currentEntity: undefined,
        position: {
            top: 0,
            left: 0
        }
    })

    const sortedArray = React.useMemo(() => {

        let newSortedArray: SortedArray = {
            'Требования к экспорту': {
                'Регионы': [],
                'Регионы запрет': [],
                'Контрагенты': [],
                'Контрагенты запрет': []
            },
            'Требования к реэкспорту': {
                'Регионы': [],
                'Регионы запрет': [],
                'Контрагенты': [],
                'Контрагенты запрет': [],
                'Страны': [],
                'Страны запрет': []
            },
            'Продукт': {
                'Наименование RUS': [],
                'Наименование LAT': [],
                'Документ': [],
                'Документ запрет': []
            },
            'Документ': {
                'Род': [],
                'Группа': [],
                'Масса среднего образца': []
            },
            'Документ запрет': {
                'Род запрет': [],
                'Группа запрет': [],
                'Масса среднего образца запрет': []
            },
            'Сопроводительные документы': {
                'Основной сопроводительный документ': [],
                'Сопутствующий сопроводительный документ': [],
                'Прочий сопроводительный документ': []
            },
            'Сопроводительные документы запрет': {
                'Основной сопроводительный документ запрет': [],
                'Сопутствующий сопроводительный документ запрет': [],
                'Прочий сопроводительный документ запрет': []
            },
            'Упаковка': {
                'Упаковка': [],
                'Обработка упаковки': [],
                'Маркировка упаковки': []
            },
            'Упаковка запрет': {
                'Упаковка запрет': [],
                'Обработка упаковки запрет': [],
                'Маркировка упаковки запрет': []
            },
            'Другое': {
                'Страна': [],
                'ТНВЭД': [],
                'ТНВЭД запрет': [],
                'Карантинные объекты': [],
                'Карантинные объекты запрет': [],
                'КФЗ': [],
                'Подкарантинные объекты': [],
                'Подкарантинные объекты запрет': [],
                'Методы отбора образцов': [],
                'Места ввоза запрет': []
            },
            'Транзит': {
                'Условия транзита': []
            },
            'Транзит запрет': {
                'Условия транзита запрет': []
            },
            'Места ввоза': {
                'Место ввоза': [],
                'с': [],
                'по': []
            },
            'Места ввоза запрет': {
                'Место ввоза запрет': [],
                'с запрет': [],
                'по запрет': []
            },
            'Условия транспортировки': {
                'Условия': [],
                'Примечание': [],
                'Допускается экспорт ФСКС': []
            },
            'Условия транспортировки запрет': {
                'Условия запрет': [],
                'Примечание запрет': [],
                'Допускается экспорт ФСКС запрет': []
            },
            'Типы прочих объектов': {
                'Тип': []
            },
            'Типы прочих объектов запрет': {
                'Тип запрет': []
            },
            'Методы отбора образцов': {
                'Наименование': [],
                'Методы': []
            }
        }

        getEntities(state).forEach((myEntity) => {
            const {sort, selectionType, text} = myEntity.entity.getData()
            if (sort && selectionType && text) {
                newSortedArray = {
                    ...newSortedArray,
                    [sort]: {
                        ...newSortedArray[sort],
                        [selectionType]: [...newSortedArray[sort][selectionType], text]
                    }
                }
            }
        })
        return newSortedArray
    }, [getEntities(state)])

    const getViewObject = React.useCallback(() => {
        setFlowerObject([{
            country: sortedArray['Другое']['Страна'][0],
            'Методы_отбора_образцов': sortedArray['Методы отбора образцов']['Методы'] && sortedArray['Методы отбора образцов']['Наименование'][0] ? {
                'Методы': sortedArray['Методы отбора образцов']['Методы'],
                'Наименование': sortedArray['Методы отбора образцов']['Наименование'][0]
            } : undefined,
            'Сопроводительные документы': sortedArray['Сопроводительные документы']['Основной сопроводительный документ'][0] ? {
                    "Основной_сопроводительный_документ": [{
                        "Тип": sortedArray['Сопроводительные документы']['Основной сопроводительный документ'][0],
                        "Период действия": ''
                    }],
                    "Сопутствующий_сопроводительный_документ": undefined,
                    "Прочий_сопроводительный_документ": undefined
            } : undefined
        }])
    }, [sortedArray])

    const toolTip: InlineToolTip = React.useMemo(() => {

        if (!state.getSelection().isCollapsed()) {

            const selectionRange = getSelectionRange()

            if (!selectionRange) {
                return positionAutocomplete
            }

            const selectionCoords = getSelectionCoords(selectionRange)

            if (selectionCoords.offsetTop === 0 && selectionCoords.offsetLeft === 0) {
                if (positionAutocomplete.position) {
                    setPositionAutocomplete({
                        show: false,
                        text: '',
                    })
                }
                return positionAutocomplete
            }

            if (positionAutocomplete?.position?.top !== selectionCoords.offsetTop || positionAutocomplete.position.left !== selectionCoords.offsetLeft) {
                setPositionAutocomplete({
                    show: true,
                    text: getSelectionText(),
                    currentEntity: getSelectionEntity(state),
                    position: {
                        top: selectionCoords.offsetTop,
                        left: selectionCoords.offsetLeft
                    }
                })
            }

            return positionAutocomplete
        } else {
            if (positionAutocomplete.position) {
                setPositionAutocomplete({
                    show: false,
                    text: '',
                })
            }
            return positionAutocomplete
        }
    }, [state, positionAutocomplete])

    const toggleBlockType = React.useCallback((blockType: BlockType) => {
        setState((currentState) =>
            RichUtils.toggleBlockType(currentState, blockType)
        );
    }, []);

    const currentBlockType = React.useMemo(() => {
        const selection = state.getSelection();
        /*console.log('Selection: ',selection.toJS())*/
        const content = state.getCurrentContent();
        /*console.log('Content: ', content.toJS())*/
        const block = content.getBlockForKey(selection.getStartKey());
        /*console.log('block: ', block.toJS());*/
        return block.getType() as BlockType;
    }, [state]);

    const toggleInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
        setState((currentState) =>
            RichUtils.toggleInlineStyle(currentState, inlineStyle)
        );
    }, []);

    const hasInlineStyle = React.useCallback(
        (inlineStyle: InlineStyle) => {
            const currentStyle = state.getCurrentInlineStyle();
            return currentStyle.has(inlineStyle);
        },
        [state]
    );

    const setEntityData = React.useCallback((entityKey, data) => {
        setState((currentState) => {
            const content = currentState.getCurrentContent();
            const contentStateUpdated = content.mergeEntityData(entityKey, data);
            return EditorState.push(
                currentState,
                contentStateUpdated,
                "apply-entity"
            );
        });
    }, []);

    const addEntity = React.useCallback(
        (
            entityType: EntityType,
            data: Record<string, string>,
            mutability: DraftEntityMutability
        ) => {
            setState((currentState) => {
                const contentState = currentState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                    entityType,
                    mutability,
                    data
                );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newState = EditorState.set(currentState, {
                    currentContent: contentStateWithEntity,
                });
                return RichUtils.toggleLink(
                    newState,
                    newState.getSelection(),
                    entityKey
                );
            });
        },
        []
    );

    const addLink = React.useCallback(
        (url) => {
            addEntity(EntityType.link, {url}, "MUTABLE");
        },
        [addEntity]
    );

    const addSelectionType = React.useCallback((selectionType) => {
        addEntity(EntityType.typed, {selectionType}, "MUTABLE")
    }, [addEntity])

    const handleKeyCommand = React.useCallback(
        (command: KeyCommand, editorState: EditorState) => {
            if (command === "accent") {
                toggleInlineStyle(InlineStyle.ACCENT);
                return "handled";
            }

            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState) {
                setState(newState);
                return "handled";
            }

            return "not-handled";
        },
        [toggleInlineStyle]
    );

    const handlerKeyBinding = React.useCallback((e: React.KeyboardEvent) => {
        if (e.keyCode === 81 && KeyBindingUtil.hasCommandModifier(e)) {
            return "accent";
        }

        return getDefaultKeyBinding(e);
    }, []);

    const toHtml = React.useCallback(
        () => stateToHTML(state.getCurrentContent()),
        [state]
    );

    const isSelected = React.useMemo(() => {
        console.log()
    }, [state])

    return React.useMemo(
        () => ({
            state,
            onChange: setState,
            toggleBlockType,
            currentBlockType,
            toggleInlineStyle,
            hasInlineStyle,
            toHtml,
            addLink,
            addSelectionType,
            setEntityData,
            handleKeyCommand,
            handlerKeyBinding,
            toolTip,
            sortedArray,
            flowerObject,
            getViewObject
        }),
        [
            state,
            toggleBlockType,
            currentBlockType,
            toggleInlineStyle,
            hasInlineStyle,
            toHtml,
            addLink,
            addSelectionType,
            setEntityData,
            handleKeyCommand,
            handlerKeyBinding,
            toolTip,
            sortedArray,
            flowerObject,
            getViewObject
        ]
    );
};
