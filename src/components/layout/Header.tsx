"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show theme toggle when mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-xl font-bold"
        >
          <span className="text-primary mr-1">Build Co</span>
          <span>Freight Node</span>
        </Link>
        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link
              href="#quote"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Dark/Light Mode Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
              className="ml-2 dark:bg-dark-muted dark:hover:bg-opacity-80 dark:text-dark-text"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
