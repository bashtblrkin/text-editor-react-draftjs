import SelectionText from './SelectionText';
import { EntityType } from "../config";
import { ContentBlock, ContentState, DraftDecorator } from "draft-js";

function findSelectionEntities(
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState
): void {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === EntityType.typed
        );
    }, callback);
}

const decorator: DraftDecorator = {
    strategy: findSelectionEntities,
    component: SelectionText,
};

export default decorator;