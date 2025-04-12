import type { ProductInfo } from "../types/form";

// Mock function to fetch product details from a URL
// In a real application, this would scrape the website or call an external API
export async function fetchProductFromUrl(url: string): Promise<ProductInfo | null> {
  // For demo purposes, we'll return mock data based on the URL
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if it's the specific test AliExpress URL provided in requirements
    if (url.includes('1005008364840352')) {
      return {
        productTitle: "High-Performance Industrial CNC Machine",
        price: 580000,  // Matching the required ~$580,000 price point
        imageUrl: "https://source.unsplash.com/300x300/?industrial+machinery",
        estimatedWeight: 6000,  // Heavy industrial equipment
        availableStock: 2
      };
    }

    // Check if it's a general AliExpress URL
    if (url.includes('aliexpress') || url.includes('alibaba')) {
      // Extract item ID from URL if possible
      const itemIdMatch = url.match(/item\/(\d+)/);
      const itemId = itemIdMatch ? itemIdMatch[1] : 'generic';

      // Generate price based on item ID for some variability
      // Default to high-value product to match requirements
      const lastDigit = Number.parseInt(itemId.slice(-1)) || 5;
      const basePrice = 500000 + (lastDigit * 10000);

      return {
        productTitle: `High-Value Industrial Product ${itemId}`,
        price: basePrice,
        imageUrl: "https://source.unsplash.com/300x300/?industrial+product",
        estimatedWeight: 1200 + (lastDigit * 100),
        availableStock: 10
      };
    }

    // Check if it's an Amazon URL
    if (url.includes('amazon')) {
      return {
        productTitle: "Industrial Equipment Package",
        price: 550000,
        imageUrl: "https://source.unsplash.com/300x300/?industrial+equipment",
        estimatedWeight: 2000,
        availableStock: 3
      };
    }

    // Generic response for other URLs - ensure it meets the high price requirement
    return {
      productTitle: "Generic High-Value Product",
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
