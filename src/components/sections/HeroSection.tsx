"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDownIcon } from "@radix-ui/react-icons";

function HeroSection() {
  const scrollToQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const quoteSection = document.getElementById("quote");
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Can't Import From China Direct? We'll Reroute It Securely Through Australia.
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Upload your supplier link and let us take care of the rest.
            </p>
          </div>
          <div className="space-x-4 pt-6">
            <Button
              size="lg"
              onClick={scrollToQuote}
              className="inline-flex items-center"
            >
              Start a Quote
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="bg-gray-100 p-4 mt-6 rounded-md shadow-sm text-center text-gray-800 w-full max-w-[700px]">
            <h3 className="text-xl font-semibold mb-2">Pricing</h3>
            <ul className="list-disc list-inside">
              <li>12.5% flat access fee on all orders ≥ USD $500,000</li>
              <li>$10.50 USD/kg freight & handling rate</li>
              <li>No hidden costs or agent markups</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
