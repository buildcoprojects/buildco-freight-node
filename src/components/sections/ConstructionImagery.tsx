"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function ConstructionImagery() {
  const constructionProducts = [
    {
      id: "lighting",
      title: "Industrial Lighting Systems",
      description: "Energy-efficient commercial lighting solutions for construction projects.",
      imageUrl: "https://assets.usesi.com/product-media/images/P859501.jpg",
    },
    {
      id: "steel_framing",
      title: "Structural Steel Framing",
      description: "High-strength steel framing components for commercial construction.",
      imageUrl: "https://www.clarkdietrich.com/sites/default/files/styles/product_gallery_full_square/public/content/product/images/profile/Shaftwall%20CH.png?itok=O9VZFYeU",
    },
    {
      id: "hvac",
      title: "HVAC Systems & Components",
      description: "Commercial-grade heating, ventilation, and cooling equipment.",
      imageUrl: "https://thumbs.dreamstime.com/b/warehouse-worker-loading-construction-materials-forklift-distribution-103381343.jpg",
    },
    {
      id: "prefab_panels",
      title: "Prefabricated Wall Panels",
      description: "Factory-produced wall systems for accelerated construction timelines.",
      imageUrl: "https://c8.alamy.com/comp/WK9E7P/cement-building-blocks-stacked-on-pallets-used-for-transportation-and-distribution-at-a-hardware-depot-warehouse-or-on-a-construction-site-WK9E7P.jpg",
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Construction Hardware Categories
            </h2>
            <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our cross-jurisdictional corridor specializes in these high-value construction hardware categories
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {constructionProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-0 shadow-md">
              <div className="aspect-video relative">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center text-sm text-blue-600">
                  <span className="font-medium">Eligible for AU-US corridor routing</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-center">Construction Corridor Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-700"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h4 className="font-medium mb-2">Cost Efficiency</h4>
              <p className="text-sm text-gray-600">Optimize your construction budget with our specialized routing corridor</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-700"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h4 className="font-medium mb-2">Compliance Assured</h4>
              <p className="text-sm text-gray-600">Dual-jurisdiction regulatory clearance for all construction hardware</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-700"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h4 className="font-medium mb-2">Full Documentation</h4>
              <p className="text-sm text-gray-600">Building code compliance certification for all imported materials</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
