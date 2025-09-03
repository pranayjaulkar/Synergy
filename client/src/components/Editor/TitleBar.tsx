import { File } from "@/types/file";
import { CircleUserIcon } from "lucide-react";

export default function TitleBar({ file }: { file: File }) {
  return (
    <div className="flex items-centerdark:bg-zinc-800 w-full py-1.5 px-2">
      {/* File Name */}
      <h1 className="px-4 text-sm dark:text-zinc-300">{file.name}</h1>

      {/* User Icon */}
      <button className="ml-auto mx-2">
        <CircleUserIcon size={20} className="dark:text-white" />
      </button>
    </div>
  );
}
