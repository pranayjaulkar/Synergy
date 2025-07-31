export default function RecentSection() {
  const recentFiles = [
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
    { name: "route.ts" },
  ];
  return (
    <div className="w-full flex flex-col justify-center ">
      <div className="mx-auto px-4 w-5xl">
        <div className="flex items-center justify-between pt-8 pb-6">
          <p className="text-lg dark:text-white">Recent Documents</p>
        </div>
        <div className="grid grid-cols-6 gap-x-8 gap-y-10   ">
          {recentFiles.map((file, index) => (
            <div key={index} className="w-full cursor-pointer">
              <div className="min-h-44 border transition-all duration-200 border-zinc-300 dark:border-zinc-700 hover:border-violet-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 w-full mb-4 flex"></div>
              <p className="hover:opacity-60 text-sm dark:text-white">{file.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
