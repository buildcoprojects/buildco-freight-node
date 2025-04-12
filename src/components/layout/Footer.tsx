"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

function Footer() {
  const contactEmail = "freightnode@buildcoprojects.com.au";

  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Build Co Freight Node</h3>
            <p className="text-sm text-muted-foreground">
              Strategic freight forwarding service helping US-based clients bypass China–US tariffs.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact</h3>
            <Link
              href={`mailto:${contactEmail}`}
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="mr-2 h-4 w-4" />
              {contactEmail}
            </Link>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="#privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#refund"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Non-Refundable Fee Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <p className="text-sm text-muted-foreground text-center">
            Powered by Build Co Pty Ltd (ABN 44 677 960 735) – Strategic Forwarding Services
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
