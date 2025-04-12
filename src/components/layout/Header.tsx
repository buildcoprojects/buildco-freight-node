"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

function Header() {
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
      </div>
    </header>
  );
}

export default Header;
