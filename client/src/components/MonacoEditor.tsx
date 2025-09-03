import Editor, { Monaco, OnChange, OnMount, OnValidate } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRef } from "react";
import TabsList from "./Editor/TabsList";

export default function MonacoEditor() {
  const editorRef = useRef<null | editor.IStandaloneCodeEditor>(null);

  const handleEditorChange: OnChange = (value, event) => {
    console.log("event: ", event);
    console.log("value: ", value);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    console.log("onMount: the monaco instance:", monaco);
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    console.log("beforeMount: the monaco instance:", monaco);
  };

  const handleEditorValidation: OnValidate = (markers) => {
    console.log("markers: ", markers);
  };

  return (
    <div className="w-screen h-screen flex flex-col text-sm">
      <div className="w-full h-full flex flex-col bg-[#161616] ">
        <TabsList />
        <div className="fl  ex flex-col flex-1 h-full">
          <Editor
            theme="vs-dark"
            height="100%"
            width="100%"
            defaultLanguage="javascript"
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            onValidate={handleEditorValidation}
          />
        </div>
      </div>
    </div>
  );
}
