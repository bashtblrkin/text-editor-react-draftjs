import {EditorState, Entity} from "draft-js";

export const getSelectionRange = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount === 0) return null;
    return selection?.getRangeAt(0);
};

export const getSelectionCoords = (selectionRange: Range) => {
    const rangeBounds = selectionRange.getBoundingClientRect();

    if (rangeBounds.left === 0 && rangeBounds.top === 0) {
        return {offsetLeft: 0, offsetTop: 0};
    }

    const offsetLeft = rangeBounds.left + (rangeBounds.width / 2)
    const offsetTop = rangeBounds.top + rangeBounds.height + 10
    return {offsetLeft, offsetTop};
};

export const getSelectionText = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount === 0) return '';
    return selection ? selection.toString() : ''
}

export const getSelectedBlocksMap = (editorState: EditorState) => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const startKey = selectionState.getStartKey();
    const endKey = selectionState.getEndKey();
    const blockMap = contentState.getBlockMap();
    return blockMap
        .toSeq()
        .skipUntil((_, k) => k === startKey)
        .takeUntil((_, k) => k === endKey)
        .concat([[endKey, blockMap.get(endKey)]]);
}

export const getSelectedBlocksList = (editorState: EditorState) => {
    return getSelectedBlocksMap(editorState).toList();
}

export const getSelectedBlock = (editorState: EditorState) => {
    if (editorState) {
        return getSelectedBlocksList(editorState).get(0);
    }
    return undefined;
}

export const getSelectionEntity = (editorState: EditorState) => {
    let entity;
    const selection = editorState.getSelection();
    let start = selection.getStartOffset();
    let end = selection.getEndOffset();
    if (start === end && start === 0) {
        end = 1;
    } else if (start === end) {
        start -= 1;
    }
    const block = getSelectedBlock(editorState);

    if (block) {
        for (let i = start; i < end; i += 1) {
            const currentEntity = block.getEntityAt(i);
            if (!currentEntity) {
                entity = undefined;
                break;
            }
            if (i === start) {
                entity = currentEntity;
            } else if (entity !== currentEntity) {
                entity = undefined;
                break;
            }
        }
        return entity;
    }
    return undefined
}

type entityRange = {
    start: number,
    end: number,
    text: string
}

export const getEntityRange = (editorState: EditorState, entityKey: Entity): entityRange | undefined => {
    const block = getSelectedBlock(editorState);
    let entityRange: entityRange;
    if (block) {
        block.findEntityRanges(
            value => value.getEntity() === entityKey,
            (start, end) => {
                entityRange = {
                    start,
                    end,
                    text: block.get('text').slice(start, end),
                };
            }
        );
        return entityRange!;
    }
    return undefined;
}

