"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-white/20 transition"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
