import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);
const STORAGE_KEY = "theme";

/**
 * Применяет класс к html (без React)
 */
function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.remove("light-theme", "dark-theme");
  root.classList.add(`${theme}-theme`);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem(STORAGE_KEY) || "light";
  });

  // применяем тему
  useEffect(() => {
    const current = document.documentElement.classList.contains(
      theme + "-theme",
    );
    if (!current) {
      applyTheme(theme);
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // sync между вкладками
  useEffect(() => {
    const handler = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setTheme(e.newValue);
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const value = { theme, setTheme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
