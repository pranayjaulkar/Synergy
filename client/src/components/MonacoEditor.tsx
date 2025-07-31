import { TemplateID } from "@/types/template";
import { EDITOR_BG_COLOR, TEMPALTE_IDS } from "@/utils/constants";
import Editor, { Monaco, OnChange, OnMount, OnValidate } from "@monaco-editor/react";
import { X } from "lucide-react";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

type TFile = {
	name: string;
	value: string;
};

export default function MonacoEditor() {
	const [searchParams] = useSearchParams();
	const editorRef = useRef<null | editor.IStandaloneCodeEditor>(null);
	const [currentFile, setCurrentFile] = useState<TFile>({ value: "", name: "untitled-1" });
	const [openedFiles, setOpenedFiles] = useState<TFile[]>([currentFile]);

	const files = [
		{ name: "fileName 1.js", value: "File 1 content" },
		{ name: "fileName 2.js", value: "File 2 content" },
		{ name: "fileName 3.js", value: "File 3 content" },
		{ name: "fileName 4.js", value: "File 4 content" },
		{ name: "fileName 5.js", value: "File 5 content" },
	];

	const handleFileSelect = (file: TFile) => {
		setOpenedFiles((prev) => [...prev, file]);
	};

	const handleFileClose = (file: TFile) => {
		setOpenedFiles((prev) => prev.filter((f) => f.name !== file.name));
		editorRef.current?.setValue(file.value);
	};

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

	useEffect(() => {
		const templateId = searchParams.get("t");

		if (templateId !== "untitled-1") {
			if (TEMPALTE_IDS.includes(templateId as TemplateID)) {
				//
			}
		} else {
			editorRef.current?.setValue(currentFile.value);
		}
	}, [currentFile]);

	return (
		<div className="w-screen h-screen flex flex-col text-sm">
			<div className="flex items-center">
				<div
					style={{ backgroundColor: EDITOR_BG_COLOR }}
					className="flex border-r min-w-52 h-screen pt-2 flex-col space-y-0.5"
				>
					{files.map((file) => (
						<div
							onClick={() => handleFileSelect(file)}
							className="cursor-pointer px-2 hover:bg-accent border-b py-[1px]"
						>
							{file.name}
						</div>
					))}
				</div>
				<div className="w-full h-full flex flex-col bg-[#161616] ">
					<div className="w-full flex items-center pb-2 pt-2 px-2">
						{openedFiles.map((OFile) => (
							<div
								style={{ backgroundColor: EDITOR_BG_COLOR }}
								className="flex items-center pl-3 pr-2 py-1 border rounded-sm cursor-pointer space-x-2"
							>
								<span>{OFile.name}</span>
								<div onClick={() => handleFileClose(OFile)} className="h-full w-3.5">
									<X className="size-3.5" />
								</div>
							</div>
						))}
					</div>
					{!!openedFiles.length && (
						<Editor
							theme="vs-dark"
							height="100%"
							width="100%"
							defaultLanguage="javascript"
							// defaultValue="//some comment"
							// defaultValue={currentFile.value}
							onChange={handleEditorChange}
							onMount={handleEditorDidMount}
							beforeMount={handleEditorWillMount}
							onValidate={handleEditorValidation}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
