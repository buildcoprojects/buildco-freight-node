import type { ProductInfo } from "../types/form";

// Improved function to fetch product details from a URL
// In a real application, this would call an external API or web scraper
export async function fetchProductFromUrl(url: string): Promise<ProductInfo | null> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Parse AliExpress product ID from URL using different possible URL patterns
    let productId: string | null = null;

    // Match patterns like: aliexpress.com/item/1005008364840352.html
    const standardPattern = /item\/(\d+)(\.html)?/;

    // Match patterns like: aliexpress.us/item/_p/r1/1005008364840352.html
    const usPattern = /item\/_p\/r\d+\/(\d+)(\.html)?/;

    // Match patterns like: aliexpress.com/i/1005008364840352.html
    const shortPattern = /\/i\/(\d+)(\.html)?/;

    if (standardPattern.test(url)) {
      productId = url.match(standardPattern)?.[1] || null;
    } else if (usPattern.test(url)) {
      productId = url.match(usPattern)?.[1] || null;
    } else if (shortPattern.test(url)) {
      productId = url.match(shortPattern)?.[1] || null;
    }

    // If we still don't have a product ID, try a more generic pattern
    if (!productId) {
      const genericIdPattern = /(\d{13,16})/; // Most AliExpress IDs are 13-16 digits
      const match = url.match(genericIdPattern);
      if (match) productId = match[1];
    }

    console.log("Extracted product ID:", productId);

    // Mock product catalog with sample data
    const productCatalog: Record<string, ProductInfo> = {
      // The specific test product from requirements
      "1005008364840352": {
        productTitle: "High-Performance Industrial CNC Machine",
        price: 580000,  // $580,000
        imageUrl: "https://source.unsplash.com/300x300/?industrial+machinery",
        estimatedWeight: 6000,  // Heavy industrial equipment
        availableStock: 2
      },
      // Additional mock products
      "1005006217693724": {
        productTitle: "Automated Manufacturing Production Line",
        price: 750000,
        imageUrl: "https://source.unsplash.com/300x300/?manufacturing+automation",
        estimatedWeight: 8500,
        availableStock: 1
      },
      "1005004783921093": {
        productTitle: "Industrial Robotic Arm System",
        price: 520000,
        imageUrl: "https://source.unsplash.com/300x300/?robotic+arm",
        estimatedWeight: 1200,
        availableStock: 5
      },
      "1005005689304155": {
        productTitle: "Pharmaceutical Production Equipment",
        price: 620000,
        imageUrl: "https://source.unsplash.com/300x300/?pharmaceutical+equipment",
        estimatedWeight: 3000,
        availableStock: 3
      }
    };

    // If we have a specific product ID that matches our catalog, return it
    if (productId && productCatalog[productId]) {
      return productCatalog[productId];
    }

    // If URL contains AliExpress/Alibaba but no matching ID in catalog,
    // generate a product with the ID to demonstrate parsing worked
    if ((url.includes('aliexpress') || url.includes('alibaba')) && productId) {
      // Generate price based on extracted ID for some variability
      const lastDigits = productId.slice(-4);
      const basePrice = 500000 + (Number.parseInt(lastDigits) % 100) * 1000;

      return {
        productTitle: `Industrial Equipment ${productId.slice(-6)}`,
        price: basePrice,
        imageUrl: "https://source.unsplash.com/300x300/?industrial+equipment",
        estimatedWeight: 2000 + (Number.parseInt(lastDigits) % 10) * 500,
        availableStock: 1 + (Number.parseInt(lastDigits) % 5)
      };
    }

    // For other URLs, return a generic high-value product
    return {
      productTitle: "Generic High-Value Industrial Product",
      price: 520000,
      imageUrl: "https://source.unsplash.com/300x300/?expensive+product",
      estimatedWeight: 1500,
      availableStock: 8
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}

// Check if order meets minimum requirement of $500,000
export function checkMinimumOrderAmount(unitPrice: number, quantity: number): {
  isValid: boolean;
  shortfallAmount: number;
} {
  const MINIMUM_ORDER_AMOUNT = 500000; // $500,000
  const totalOrderValue = unitPrice * quantity;

  const isValid = totalOrderValue >= MINIMUM_ORDER_AMOUNT;
  const shortfallAmount = isValid ? 0 : MINIMUM_ORDER_AMOUNT - totalOrderValue;

  return {
    isValid,
    shortfallAmount
  };
}

// Check if requested quantity is available
export function checkStockAvailability(requestedQuantity: number, availableStock: number): {
  isAvailable: boolean;
  availableStock: number;
} {
  return {
    isAvailable: requestedQuantity <= availableStock,
    availableStock
  };
}

// Mock function to calculate shipping options based on weight and destination
export function calculateShippingOptions(weight: number, destination: { city: string, state: string, zipCode: string, country: string }) {
  // Base rates
  const expressBaseRate = 20;
  const courierBaseRate = 35;

  // Weight multiplier (per kg)
  const expressWeightMultiplier = 15;
  const courierWeightMultiplier = 10;

  // Calculate total prices
  const expressPrice = expressBaseRate + (weight * expressWeightMultiplier);
  const courierPrice = courierBaseRate + (weight * courierWeightMultiplier);

  return [
    {
      id: "express",
      name: "Express Shipping",
      description: "Fast delivery via air freight",
      price: Number(expressPrice.toFixed(2)),
      estimatedDays: "10-14 days"
    },
    {
      id: "courier",
      name: "Courier Service",
      description: "Premium courier service with tracking",
      price: Number(courierPrice.toFixed(2)),
      estimatedDays: "7-10 days"
    }
  ];
}

// Calculate service fee (12.5% of item price)
export function calculateServiceFee(itemPrice: number): number {
  return Number((itemPrice * 0.125).toFixed(2));
}

// Calculate total estimate
export function calculateTotal(itemPrice: number, serviceFee: number, shippingPrice: number): number {
  return Number((itemPrice + serviceFee + shippingPrice).toFixed(2));
}
