import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export default function ThemeSwitch() {
  const { darkMode, setDarkMode } = useContext(ThemeContext)!;

  return (
    <div className="min-h-8 min-w-8 p-2">
      <div
        onClick={() => setDarkMode((prev) => !prev)}
        className="cursor-pointer hover:opacity-50 transition-all duration-100 min-w-6 min-h-6 w-6 h-6"
      >
        {darkMode ? <Moon color="white" /> : <Sun color="black" />}
      </div>
    </div>
  );
}
