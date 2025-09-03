import { editor } from "monaco-editor";
import React from "react";

export type Editor = editor.IStandaloneCodeEditor;
export type EditorRef = React.RefObject<null | Editor>;

export type Tab = {
  id: string;
  title: string;
  file: Partial<File>;
  editor: EditorRef | null;
};
