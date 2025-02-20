import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext<null | {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}>(null);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
    const mode = localStorage.getItem("darkMode");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else if (!darkMode || mode === "false") {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
