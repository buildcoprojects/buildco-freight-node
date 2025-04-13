"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
<<<<<<< HEAD
  // Construction-specific testimonials
  const testimonials = [
    {
      id: "1",
      name: "Robert M.",
      company: "BuildTech Supplies",
      text: "Build Co's construction corridor saved us over $350K on a major shipment of structural steel. Their cross-jurisdictional routing through Australia is a game-changer for our large-scale projects.",
      role: "Chief Procurement Officer"
    },
    {
      id: "2",
      name: "Jennifer T.",
      company: "GlobalConstruct Hardware",
      text: "When sourcing HVAC systems in bulk from Asia, we faced significant tariff challenges. Build Co's construction hardware corridor provided a fully compliant pathway that preserved our margins.",
      role: "Supply Chain Director"
    },
    {
      id: "3",
      name: "Carlos D.",
      company: "PreFab Solutions Inc.",
      text: "Their dedicated construction hardware shipping channel has transformed how we manage our prefabricated panel imports. We've reduced regulatory complexity while maintaining full compliance.",
      role: "Operations Executive"
    },
    {
      id: "4",
      name: "Sarah W.",
      company: "ConstructionLighting Direct",
      text: "The specialized construction product category handling made our industrial lighting fixture imports seamless. Their AU-US corridor provides protection from supply chain disruptions we didn't have before.",
=======
  // These testimonials would be populated with real customer feedback in production
  const testimonials = [
    {
      id: "1",
      name: "Sarah C.",
      company: "TechImports Inc.",
      text: "Build Co Freight Node saved us over $400K in tariffs on our first shipment. Their Australian routing strategy is brilliantly effective.",
      role: "Director of Procurement"
    },
    {
      id: "2",
      name: "Michael L.",
      company: "GlobalSource Ltd.",
      text: "The transparency throughout the process made a complex global shipping arrangement feel seamless. Their customer service is exceptional.",
      role: "Operations Manager"
    },
    {
      id: "3",
      name: "David W.",
      company: "AmeriTrade Ventures",
      text: "Their strategic freight routing expertise has transformed our supply chain economics. We now save consistently on every shipment from China.",
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
      role: "CEO"
    }
  ];

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
<<<<<<< HEAD
              Construction Industry Success Stories
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from construction hardware distributors who've optimized their supply chains with our cross-jurisdictional routing.
=======
              What Our Clients Say
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from businesses that have successfully navigated tariffs with our service.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
=======
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex mb-4">
<<<<<<< HEAD
=======
                    {/* Replace dynamic map with static stars with unique keys */}
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                    <StarIcon key={`${testimonial.id}-star-1`} className="h-5 w-5 text-yellow-500" />
                    <StarIcon key={`${testimonial.id}-star-2`} className="h-5 w-5 text-yellow-500" />
                    <StarIcon key={`${testimonial.id}-star-3`} className="h-5 w-5 text-yellow-500" />
                    <StarIcon key={`${testimonial.id}-star-4`} className="h-5 w-5 text-yellow-500" />
                    <StarIcon key={`${testimonial.id}-star-5`} className="h-5 w-5 text-yellow-500" />
                  </div>
                  <blockquote className="text-lg italic mb-4 dark:text-gray-200">"{testimonial.text}"</blockquote>
                </div>
                <div>
                  <p className="font-semibold dark:text-gray-200">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}, {testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
<<<<<<< HEAD
          <h3 className="text-xl font-medium mb-8">Trusted By Leading Construction Hardware Distributors</h3>
          <div className="flex flex-wrap justify-center gap-8 opacity-90">
            <div className="h-16 w-40 bg-white rounded shadow-sm flex items-center justify-center p-2">
              <span className="text-base font-semibold text-gray-800">BuildTech Supply</span>
            </div>
            <div className="h-16 w-40 bg-white rounded shadow-sm flex items-center justify-center p-2">
              <span className="text-base font-semibold text-gray-800">HVAC Direct</span>
            </div>
            <div className="h-16 w-40 bg-white rounded shadow-sm flex items-center justify-center p-2">
              <span className="text-base font-semibold text-gray-800">Structural Partners</span>
            </div>
            <div className="h-16 w-40 bg-white rounded shadow-sm flex items-center justify-center p-2">
              <span className="text-base font-semibold text-gray-800">PreFab Solutions</span>
            </div>
=======
          <h3 className="text-xl font-medium mb-8">Trusted By Leading Importers</h3>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {/* Placeholder company logos - these would be replaced with actual client logos */}
            <div className="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">Logo 1</div>
            <div className="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">Logo 2</div>
            <div className="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">Logo 3</div>
            <div className="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">Logo 4</div>
            <div className="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">Logo 5</div>
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
          </div>
        </div>
      </div>
    </section>
  );
}

function StarIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
