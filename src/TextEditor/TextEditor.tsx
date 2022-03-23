import * as React from "react";
import {ContentBlock, Editor} from "draft-js";
import "./TextEditor.scss";
import {BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP} from "./config";
import {useEditorApi} from "./context";
import cn from "classnames";
import ToolTip from "../ToolTip/ToolTip";
import Preview from "../Preview/Preview";
import {getBlockRendererFn} from '../utils/renderConfig'

export type TextEditorProps = {
    className?: string;
};

const TextEditor: React.FC<TextEditorProps> = ({className}) => {
    const editorApi = useEditorApi();
    const editor = React.useRef<Editor>(null)

    function myBlockStyle(contentBlock: ContentBlock): string {
        const type = contentBlock.getType()
        if (type === 'unstyled') {
            return 'default-block'
        }
        if (type === 'table') {
            return 'text-align-center'
        }
        return type
    }

    const blockRendererFn = getBlockRendererFn(editor.current)

    return (
        <>
            <ToolTip/>
            <div id="editor-container" className={cn("text-editor", className)}>
                <div>
                    <Editor
                        ref={editor}
                        handleKeyCommand={editorApi.handleKeyCommand}
                        customStyleMap={CUSTOM_STYLE_MAP}
                        blockRenderMap={BLOCK_RENDER_MAP}
                        editorState={editorApi.state}
                        onChange={editorApi.onChange}
                        keyBindingFn={editorApi.handlerKeyBinding}
                        blockStyleFn={myBlockStyle}
                        blockRendererFn={blockRendererFn}
                    />
                </div>
            </div>
            <Preview/>
        </>
    );
};

export default TextEditor;
