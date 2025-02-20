import { User } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between border-b border-b-zinc-100 dark:border-b-zinc-700 shadow">
      <div className="w-full flex items-center justify-between px-4 md:px-8 py-3 m-0 sticky min-h-16 h-16">
        <div className="flex items-center space-x-8">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="/synergy-logo.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-2xl font-medium dark:text-white">Synergy</h1>
        </div>
        <div className="flex space-x-8 items-center justify-center">
          <ThemeSwitch />
          <Profile />
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="dark:text-white dark:border-white cursor-pointer flex justify-center items-center p-2 min-w-10 min-h-10 overflow-hidden w-10 h-10 rounded-full border-2 border-gray-800">
      <User className="dark:text-white" />
    </div>
  );
}
