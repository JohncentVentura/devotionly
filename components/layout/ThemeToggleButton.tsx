"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggleButton = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Prevent SSR flicker and hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full cursor-pointer 
        hover:bg-primary dark:hover:bg-primary
        active:bg-primary dark:active:bg-primary
        transition-colors duration-150"
      />
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full cursor-pointer 
      hover:bg-primary dark:hover:bg-primary
      active:bg-primary dark:active:bg-primary
      transition-colors duration-150"
      onClick={toggleTheme}
    >
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ThemeToggleButton;
