import {Table} from './blockRenderComponent'
import {Editor, ContentBlock} from 'draft-js'

import {TODO_ADD_TYPES} from '../interface/interface';

export const getBlockRendererFn = (editor: Editor | null) => (block: ContentBlock) => {
    const type = block.getType();
    console.log(type)
    switch (type) {
        case 'table':
            return {
                component: Table,
                editable: true,
                props: {
                    editor,
                },
            };
        default:
            return null;
    }
}