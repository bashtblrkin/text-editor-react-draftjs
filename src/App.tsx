import React from "react";
import TextEditor, {TextEditorProvider} from "./TextEditor";
import ToolPanel from "./ToolPanel";
import ToolTip from "./ToolTip/ToolTip";

function App() {
    return (
        <TextEditorProvider>
                <ToolPanel/>
                <TextEditor/>
        </TextEditorProvider>
    );
}

export default App;
