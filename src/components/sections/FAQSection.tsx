"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      id: "delivery-time",
<<<<<<< HEAD
      question: "What are the typical transit times for construction hardware shipments?",
      answer: "Construction materials typically take 10-18 days for transit from Asia to Australia, and an additional 6-12 days from Australia to the US. Total transit time is usually 16-30 days, depending on material type, dimensions, and customs processing. Bulkier construction products like structural steel or prefabricated components may require specialized handling that can extend these timeframes."
    },
    {
      id: "construction-categories",
      question: "What types of construction hardware can be shipped through your corridor?",
      answer: "Our construction corridor handles a wide range of products including lighting systems, HVAC equipment, structural steel, framing kits, hardware tools, fixings, fasteners, and prefabricated panels. Some specialized materials with hazardous classifications (certain adhesives, coatings) may require additional documentation or may not qualify for the routing corridor."
    },
    {
      id: "customs-compliance",
      question: "How do you ensure compliance with both Australian and US construction import regulations?",
      answer: "Our specialized construction corridor leverages comprehensive understanding of both AU and US building code import regulations. We maintain documentation for materials compliance certification (fire ratings, structural integrity, etc.) and ensure all products meet both jurisdictions' standards. Our compliance team includes experts in construction product importation who pre-screen all shipments."
    },
    {
      id: "payment-structure",
      question: "What is your payment structure for construction shipments?",
      answer: "Our construction corridor requires a 22% non-refundable corridor access fee on acceptance of a quote. This covers our cross-jurisdictional routing costs and compliance processing. The remaining balance for freight and handling ($12.50/kg) is invoiced prior to final shipment to the US. This structure ensures optimal processing through our specialized construction corridor."
    },
    {
      id: "minimum-order-value",
      question: "Why is there a $500,000 minimum value for construction shipments?",
      answer: "The $500,000 minimum for construction products ensures the cross-jurisdictional economics are viable. Construction materials often have complex compliance requirements that become cost-efficient only at scale. For shipments below this threshold, the administrative costs of dual-jurisdiction processing typically exceed the benefits. Volume is essential for maintaining our specialized construction routing corridor."
    },
    {
      id: "bulk-shipments",
      question: "Can you handle bulk construction components like prefabricated wall systems?",
      answer: "Yes, we specialize in bulk prefabricated construction components. Our corridor is optimized for high-value, large-volume construction hardware shipments. We have established relationships with specialized carriers equipped to handle oversized prefabricated systems, including wall panels, floor systems, and modular components. Early consultation is recommended for these shipments to optimize container configurations."
    },
    {
      id: "building-certification",
      question: "How do you handle building code certification requirements?",
      answer: "Our construction corridor includes documentation services that ensure all products meet both Australian and US building code requirements. We maintain records of relevant certifications and compliance documentation. For specialized components requiring specific code compliance (electrical, structural, fire safety), we can coordinate third-party certification if needed to ensure smooth cross-jurisdictional transfer."
    },
    {
      id: "project-scheduling",
      question: "Can shipments be coordinated with construction project schedules?",
      answer: "Absolutely. We understand construction timelines are critical. Our service includes project schedule alignment to ensure materials arrive at the optimal time for your build sequence. For projects with phased delivery requirements, we can structure a series of coordinated shipments timed to your construction schedule with tracking visibility throughout the routing corridor."
=======
      question: "How long will delivery take?",
      answer: "Shipping typically takes 7-14 days for express shipments from China to Australia, and an additional 5-10 days from Australia to the US. Total transit time is usually 12-24 days, depending on customs processing and the specific shipping method selected."
    },
    {
      id: "non-aliexpress",
      question: "What if my supplier is not on AliExpress?",
      answer: "No problem! Our service works with any supplier in China. You can manually enter your supplier details in our 'Manual Input' form, and we'll arrange the freight forwarding accordingly. We have established relationships with logistics partners across all major Chinese manufacturing hubs."
    },
    {
      id: "multiple-items",
      question: "Can I request multiple items?",
      answer: "Yes, you can place multiple orders for different items. Each order will be processed individually to ensure optimal shipping arrangements. For complex orders with multiple product types, please contact our team directly for a custom solution."
    },
    {
      id: "payment-options",
      question: "What are the payment options?",
      answer: "We accept payment via credit/debit card and bank transfer through our secure Stripe payment gateway. Our payment process includes an initial 12.5% non-refundable service fee when you accept a quote, with the remaining balance due before final shipment from Australia to the US."
    },
    {
      id: "minimum-order-value",
      question: "Why is there a $500,000 minimum order value?",
      answer: "The $500,000 minimum ensures the tariff arbitrage economics are favorable. For shipments below this threshold, the administrative costs and compliance requirements typically outweigh the potential savings. For smaller orders, we recommend regular direct shipping options."
    },
    {
      id: "restricted-products",
      question: "Are there any restricted products?",
      answer: "Yes, we cannot ship items that are prohibited for import into Australia or the US. This includes hazardous materials, counterfeit goods, illegal products, and certain agricultural or food products. Please consult with our team if you're unsure about a specific product."
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
    }
  ];

  return (
    <section id="faq" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-gray-100">
<<<<<<< HEAD
              Construction Hardware Shipping FAQ
            </h2>
            <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Common questions about our cross-jurisdictional routing corridor for construction materials.
=======
              Frequently Asked Questions
            </h2>
            <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our freight forwarding service.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
<<<<<<< HEAD
              Have questions about shipping specific construction materials?<br />
              Contact our construction corridor specialists at{" "}
=======
              Still have questions? Contact us at{" "}
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
              <a
                href="mailto:freightnode@buildcoprojects.com.au"
                className="text-primary font-medium hover:underline"
              >
                freightnode@buildcoprojects.com.au
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
