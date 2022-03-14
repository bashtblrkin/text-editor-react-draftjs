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
import {getSelectionCoords, getSelectionRange, getSelectionText, getSelectionEntity} from "../utils";


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
    isSelected: number
    toolTip: InlineToolTip
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

    const [positionAutocomplete, setPositionAutocomplete] = useState<InlineToolTip>({
        show: false,
        text: '',
        currentEntity: undefined,
        position: {
            top: 0,
            left: 0
        }
    })

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
        /*const selection = state.getSelection();
        const content = state.getCurrentContent();
        const selectedText = getSelectionEntity(state)
        if (selectedText && content.getEntity(selectedText).getType() === EntityType.selected) {
          return false
        }
        return selection.getAnchorOffset() !== selection.getFocusOffset()*/

        const selection = state.getSelection();
        //если что-то выделено
        /*console.log(selection)*/
        if (!selection.isCollapsed()) {

        }
        return Math.abs(selection.getFocusOffset() - selection.getAnchorOffset())
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
            isSelected,
            toolTip,
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
            isSelected,
            toolTip,
        ]
    );
};
