import type { ProductInfo } from "../types/form";

// Sample AliExpress URLs for testing:
// https://www.aliexpress.com/item/1005008364840352.html
// https://www.aliexpress.us/item/3256805750180363.html
// https://www.aliexpress.com/item/1005006217693724.html
// https://www.aliexpress.us/item/_p/r1/1005004783921093.html
// https://m.aliexpress.com/item/1005005689304155.html

// Improved function to fetch product details from a URL
// In a real application, this would call an external API or web scraper
export async function fetchProductFromUrl(url: string): Promise<ProductInfo | null> {
  try {
    console.log("Fetching product from URL:", url);

    // Simulate API call delay with a reasonable timeout
    await new Promise(resolve => setTimeout(resolve, 800));

    // Extract product ID using various AliExpress URL patterns
    let productId: string | null = null;

    // Common patterns for AliExpress URLs
    const patterns = [
      /item\/(\d+)(?:\.html)?/,                  // Standard format: item/1234567890.html
      /item\/_p\/r\d+\/(\d+)(?:\.html)?/,        // US store format: item/_p/r1/1234567890.html
      /\/i\/(\d+)(?:\.html)?/,                   // Short format: /i/1234567890.html
      /item\/(\d+)(?:\/\?.*)?$/,                 // Format with query params
      /(\d{10,16})(?:\.html|\?|$)/               // Generic number extraction (10-16 digits)
    ];

    // Try each pattern until we find a match
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        productId = match[1];
        console.log(`Matched pattern ${pattern}, extracted ID: ${productId}`);
        break;
      }
    }

    // If no specific pattern matched, try a more generic approach
    if (!productId) {
      // Look for any number with 10-16 digits in the URL
      const genericMatch = url.match(/(\d{10,16})/);
      if (genericMatch) {
        productId = genericMatch[1];
        console.log(`Using generic number matching, found ID: ${productId}`);
      }
    }

    console.log("Final extracted product ID:", productId);

    if (!productId) {
      console.warn("Could not extract product ID from URL:", url);
      return null;
    }

    // Mock product catalog with sample data
    const productCatalog: Record<string, ProductInfo> = {
      // The specific test product from requirements
      "1005008364840352": {
        productTitle: "High-Performance Industrial CNC Machine",
        price: 580000,  // $580,000
        imageUrl: "https://source.unsplash.com/random/800x600/?industrial+machinery",
        estimatedWeight: 6000,
        availableStock: 2
      },
      // Additional mock products with real AliExpress IDs
      "3256805750180363": {
        productTitle: "Automated Manufacturing Production Line",
        price: 750000,
        imageUrl: "https://source.unsplash.com/random/800x600/?manufacturing+automation",
        estimatedWeight: 8500,
        availableStock: 3
      },
      "1005006217693724": {
        productTitle: "Industrial Robotic Arm System",
        price: 520000,
        imageUrl: "https://source.unsplash.com/random/800x600/?robotic+arm",
        estimatedWeight: 1200,
        availableStock: 5
      },
      "1005004783921093": {
        productTitle: "Advanced Semiconductor Equipment",
        price: 645000,
        imageUrl: "https://source.unsplash.com/random/800x600/?semiconductor",
        estimatedWeight: 2200,
        availableStock: 2
      },
      "1005005689304155": {
        productTitle: "Pharmaceutical Production Equipment",
        price: 620000,
        imageUrl: "https://source.unsplash.com/random/800x600/?pharmaceutical+equipment",
        estimatedWeight: 3000,
        availableStock: 3
      }
    };

    // Check if the extracted ID matches any product in our catalog
    if (productId && productCatalog[productId]) {
      console.log("Found matching product in catalog:", productCatalog[productId].productTitle);
      return productCatalog[productId];
    }

    // If it's a valid AliExpress URL but we don't have it in our catalog,
    // generate a dynamic product based on the ID
    if ((url.toLowerCase().includes('aliexpress') || url.toLowerCase().includes('alibaba')) && productId) {
      // Generate deterministic but varied values based on the product ID
      const hash = productId.split('').reduce((acc, char) => {
        return (acc * 31 + char.charCodeAt(0)) % 1000000;
      }, 0);

      // Use the hash to generate price between $500,000 and $800,000
      const price = 500000 + (hash % 300000);
      const availableStock = 1 + (hash % 5);
      const weight = 1000 + (hash % 5000);

      const generatedProduct: ProductInfo = {
        productTitle: `Industrial Equipment ${productId.slice(-6)}`,
        price: price,
        imageUrl: `https://source.unsplash.com/random/800x600/?industrial+equipment&sig=${productId.slice(-4)}`,
        estimatedWeight: weight,
        availableStock: availableStock
      };

      console.log("Generated product from ID:", generatedProduct);
      return generatedProduct;
    }

    // For non-AliExpress URLs or if we failed to generate a product
    console.log("URL not recognized as AliExpress/Alibaba, returning generic product");

    // Default fallback
    return {
      productTitle: "Generic High-Value Industrial Product",
      price: 520000,
      imageUrl: "https://source.unsplash.com/random/800x600/?expensive+product",
      estimatedWeight: 1500,
      availableStock: 8
    };
  } catch (error) {
    console.error("Error in fetchProductFromUrl:", error);
    // Return null on error so we can handle it appropriately in the UI
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
