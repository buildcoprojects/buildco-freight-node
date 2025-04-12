"use client";

import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import QuoteForm from "@/components/forms/QuoteForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-center" />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <QuoteForm />
        <TestimonialsSection />
        <FAQSection />

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our strategic freight forwarding service helps you bypass tariffs with a compliant approach.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>1. Submit Your Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Provide details about your product from China, either by sharing a URL or entering information manually.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. China to Australia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We coordinate the shipment from your Chinese supplier to our Australian processing hub.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Australia to US</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your product is forwarded from Australia to the US, avoiding the direct China-US tariffs.
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
                  Why Choose Build Co Freight Node
                </h2>
                <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a strategic alternative to direct shipping from China to the US.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2">
              <div className="flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold">Tariff Avoidance</h3>
                  <p className="text-gray-500 mt-2">
                    Legally bypass high China–US tariffs by routing through Australia.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold">Simplified Logistics</h3>
                  <p className="text-gray-500 mt-2">
                    We handle all shipping coordination from your supplier to your US address.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold">Compliance Focus</h3>
                  <p className="text-gray-500 mt-2">
                    All operations are conducted in full compliance with applicable trade laws.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold">Transparent Pricing</h3>
                  <p className="text-gray-500 mt-2">
                    Clear fee structure with a 12.5% service fee and shipping at cost plus handling.
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
                  Need Assistance?
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our team is ready to help with your freight forwarding needs.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <a
                  href="mailto:freightnode@buildcoprojects.com.au"
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
