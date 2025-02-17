import Editor, {  Monaco, OnChange, OnMount, OnValidate } from "@monaco-editor/react";

function App() {
  const handleEditorChange: OnChange = (value, event) => {
    console.log("event: ", event);
    console.log("value: ", value);
    // here is the current value
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
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  };
  return (
    <div>
      <Editor
        height="90vh"
        width={1500}
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
      />
    </div>
  );
}

export default App;
