"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add(
        "dark"
      );

      setDark(true);
    }
  }, []);

  function toggleTheme() {
    const html =
      document.documentElement;

    if (dark) {
      html.classList.remove("dark");

      localStorage.setItem(
        "theme",
        "light"
      );
    } else {
      html.classList.add("dark");

      localStorage.setItem(
        "theme",
        "dark"
      );
    }

    setDark(!dark);
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        flex h-11 w-11 items-center
        justify-center rounded-2xl
        border bg-white/70
        shadow-lg backdrop-blur-xl
      "
    >
      {dark ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}