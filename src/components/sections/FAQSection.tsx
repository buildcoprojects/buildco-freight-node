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
    }
  ];

  return (
    <section id="faq" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-gray-100">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our freight forwarding service.
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
              Still have questions? Contact us at{" "}
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
