"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
<<<<<<< HEAD
import { ArrowDownIcon, LockClosedIcon } from "@radix-ui/react-icons";
=======
import { ArrowDownIcon } from "@radix-ui/react-icons";
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869

function HeroSection() {
  const scrollToQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const quoteSection = document.getElementById("quote");
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
<<<<<<< HEAD
    <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-3 max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Cross-Border Routing for Construction Supply Chains
            </h1>
            <p className="mx-auto text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400">
              We manage structured freight intake for construction hardware distributors sourcing from Asia.
              Routed via Australia. Cleared into the U.S.
              Engineered for clients operating under regulatory constraint.
            </p>
          </div>
          <div className="pt-2 sm:pt-4 md:pt-6">
            <Button
              size="lg"
              onClick={scrollToQuote}
              className="inline-flex items-center text-sm sm:text-base"
            >
              Submit Construction Shipment
=======
    <section className="w-full py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Reroute Your High-Value Orders via Australia
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
              Reroute Your Order Now
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>

<<<<<<< HEAD
          <div className="bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 mt-4 sm:mt-6 rounded-md shadow-sm text-center text-gray-800 dark:text-gray-200 w-full max-w-[90%] sm:max-w-[85%] md:max-w-[700px]">
            <h3 className="text-lg font-semibold mb-2">Pricing</h3>
            <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
              <li className="break-words">22% corridor access fee for all shipments ≥ USD $500,000</li>
              <li className="break-words">Flat $12.50 USD/kg freight & handling</li>
              <li className="break-words">No agent markups. No FX spread.</li>
              <li className="break-words">Routing corridor compliant under AU–US freight controls</li>
            </ul>
          </div>

          <div className="mt-4 flex items-center justify-center text-amber-700 dark:text-amber-400 text-xs sm:text-sm md:text-base">
            <LockClosedIcon className="h-4 w-4 mr-2" />
            <p>
              Access is restricted to pre-screened construction-related shipments valued above USD $500,000.
              Full intake validation and compliance routing applies.
            </p>
          </div>
=======
          <div className="bg-gray-100 p-4 mt-6 rounded-md shadow-sm text-center text-gray-800 w-full max-w-[700px]">
            <h3 className="text-xl font-semibold mb-2">Pricing</h3>
            <ul className="list-disc list-inside">
              <li>12.5% flat access fee on all orders ≥ USD $500,000</li>
              <li>$10.50 USD/kg freight & handling rate</li>
              <li>No hidden costs or agent markups</li>
            </ul>
          </div>
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
