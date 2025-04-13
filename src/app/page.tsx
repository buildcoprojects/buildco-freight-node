"use client";

import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import QuoteForm from "@/components/forms/QuoteForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
<<<<<<< HEAD
import { ConstructionImagery } from "@/components/sections/ConstructionImagery";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// Lazy load LiveChat only on client
const LiveChatLoader = dynamic(() => import("@/components/LiveChat"), { ssr: false });

export function LiveChatWrapper() {
  return <LiveChatLoader />;
}
=======
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-center" />
      <Header />
      <main className="flex-1">
        <HeroSection />
<<<<<<< HEAD
        <ConstructionImagery />
=======
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
        <QuoteForm />
        <TestimonialsSection />
        <FAQSection />

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
<<<<<<< HEAD
                  Construction Hardware Corridor Process
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our strategic cross-jurisdictional routing helps construction hardware distributors optimize their supply chains.
=======
                  How It Works
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our strategic freight forwarding service helps you bypass tariffs with a compliant approach.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
<<<<<<< HEAD
                  <CardTitle>1. Submit Construction Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Provide details about your construction hardware from Asia, including product category, specifications, and volume.
=======
                  <CardTitle>1. Submit Your Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Provide details about your product from China, either by sharing a URL or entering information manually.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
<<<<<<< HEAD
                  <CardTitle>2. Asia to Australia Transfer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We coordinate the shipment of your construction materials to our Australian processing center with full building code compliance documentation.
=======
                  <CardTitle>2. China to Australia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We coordinate the shipment from your Chinese supplier to our Australian processing hub.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
<<<<<<< HEAD
                  <CardTitle>3. Australia to US Corridor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your construction hardware is routed from Australia to the US through our specialized cross-jurisdictional corridor, optimized for building materials.
=======
                  <CardTitle>3. Australia to US</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your product is forwarded from Australia to the US, avoiding the direct China-US tariffs.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-dark-bg">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-dark-text">
<<<<<<< HEAD
                  Why Construction Distributors Choose Our Corridor
                </h2>
                <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Specialized routing benefits for high-value construction hardware importers.
=======
                  Why Choose Build Co Freight Node
                </h2>
                <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a strategic alternative to direct shipping from China to the US.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2">
              <div className="flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <div>
<<<<<<< HEAD
                  <h3 className="text-xl font-bold">Cross-Jurisdictional Advantage</h3>
                  <p className="text-gray-500 mt-2">
                    Optimize flow of construction materials through our specialized AU-US routing corridor.
=======
                  <h3 className="text-xl font-bold">Tariff Avoidance</h3>
                  <p className="text-gray-500 mt-2">
                    Legally bypass high China–US tariffs by routing through Australia.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <div>
<<<<<<< HEAD
                  <h3 className="text-xl font-bold">Construction-Focused Logistics</h3>
                  <p className="text-gray-500 mt-2">
                    We handle all shipping coordination specialized for building materials, framing, HVAC, and lighting systems.
=======
                  <h3 className="text-xl font-bold">Simplified Logistics</h3>
                  <p className="text-gray-500 mt-2">
                    We handle all shipping coordination from your supplier to your US address.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <div>
<<<<<<< HEAD
                  <h3 className="text-xl font-bold">Building Code Compliance</h3>
                  <p className="text-gray-500 mt-2">
                    All operations include dual-jurisdiction building code certification documentation for your construction hardware.
=======
                  <h3 className="text-xl font-bold">Compliance Focus</h3>
                  <p className="text-gray-500 mt-2">
                    All operations are conducted in full compliance with applicable trade laws.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  4
                </div>
                <div>
<<<<<<< HEAD
                  <h3 className="text-xl font-bold">Construction-Specific Pricing</h3>
                  <p className="text-gray-500 mt-2">
                    Structured 22% corridor access fee with $12.50/kg freight and handling rates optimized for construction hardware.
=======
                  <h3 className="text-xl font-bold">Transparent Pricing</h3>
                  <p className="text-gray-500 mt-2">
                    Clear fee structure with a 12.5% service fee and shipping at cost plus handling.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
<<<<<<< HEAD
                  Construction Hardware Assistance
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our construction corridor specialists are ready to help with your hardware shipping needs.
=======
                  Need Assistance?
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our team is ready to help with your freight forwarding needs.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <a
                  href="mailto:freightnode@buildcoprojects.com.au"
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
<<<<<<< HEAD
                  Contact Construction Specialists
=======
                  Contact Us
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                </a>
              </div>
            </div>
          </div>
        </section>
<<<<<<< HEAD

        <LiveChatWrapper />
=======
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
      </main>
      <Footer />
    </div>
  );
}
