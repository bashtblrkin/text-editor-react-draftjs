import * as React from "react";
import Draft, {ContentBlock, Editor} from "draft-js";
import "./TextEditor.scss";
import {BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP} from "./config";
import {useEditorApi} from "./context";
import cn from "classnames";
import ToolTip from "../ToolTip/ToolTip";

export type TextEditorProps = {
    className?: string;
};

const TextEditor: React.FC<TextEditorProps> = ({className}) => {
    const editorApi = useEditorApi();

    function myBlockStyle(contentBlock: ContentBlock): string {
        const type = contentBlock.getType()
        if (type === 'unstyled') {
            return 'default-block'
        }
        return type
    }

    return (
        <>
        <ToolTip/>
        <div id="editor-container" className={cn("text-editor", className)}>

            <div>
                <Editor
                    handleKeyCommand={editorApi.handleKeyCommand}
                    customStyleMap={CUSTOM_STYLE_MAP}
                    blockRenderMap={BLOCK_RENDER_MAP}
                    editorState={editorApi.state}
                    onChange={editorApi.onChange}
                    keyBindingFn={editorApi.handlerKeyBinding}
                    blockStyleFn={myBlockStyle}
                />
            </div>
        </div>
        </>
    );
};

export default TextEditor;
