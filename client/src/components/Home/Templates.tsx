import { Plus } from "lucide-react";

export default function Templates() {
  const templates = [
    { title: "Blank Document", image: "" },
    { title: "Javascript", image: "" },
    { title: "HTML", image: "" },
    { title: "CSS", image: "" },
    { title: "Typescript", image: "" },
    { title: "C++", image: "" },
    { title: "Java", image: "" },
  ];
  return (
    <div className="w-full min-h-80 bg-zinc-200 dark:bg-zinc-900 flex flex-col justify-center ">
      <div className="mx-auto px-4 w-5xl">
        <div className="flex items-center justify-between mb-6">
          <p className="text-lg dark:text-white">Start a new document</p>
          <button className="bg-transparent dark:text-white hover-darken cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-800 px-3 py-2 rounded-md">
            Template Gallery
          </button>
        </div>
        <div className="grid grid-cols-7 gap-x-8">
          {templates.map((template, index) => (
            <div key={index} className="w-full cursor-pointer">
              <div
                className={`min-h-36 border transition-all duration-200 dark:border-zinc-800 hover:border-violet-700  hover:bg-gray-300 dark:hover:bg-zinc-800 border-gray-400 w-full mb-4 flex flex-center`}
              >
                {template.title === "Blank Document" ? <Plus className="size-14 text-violet-700" /> : null}
              </div>
              <p className="hover:opacity-60 text-sm dark:text-white">{template.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
