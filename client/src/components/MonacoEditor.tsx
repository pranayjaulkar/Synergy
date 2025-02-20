import Editor, {
  Monaco,
  OnChange,
  OnMount,
  OnValidate,
} from "@monaco-editor/react";

export default function MonacoEditor() {
  const handleEditorChange: OnChange = (value, event) => {
    console.log("event: ", event);
    console.log("value: ", value);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco);
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    console.log("beforeMount: the monaco instance:", monaco);
  };

  const handleEditorValidation: OnValidate = (markers) => {
    console.log("markers: ", markers);
  };

  return (
    <Editor
      theme="vs-dark"
      height="100%"
      width="100%"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      beforeMount={handleEditorWillMount}
      onValidate={handleEditorValidation}
    />
  );
}
