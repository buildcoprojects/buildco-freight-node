import type { ProductInfo } from "../types/form";
// Remove server-side only dependencies that cause issues with static builds
// import axios from "axios";
// import { JSDOM } from "jsdom";

// Sample AliExpress URLs for testing:
// https://www.aliexpress.com/item/1005008364840352.html
// https://www.aliexpress.us/item/3256805750180363.html
// https://www.aliexpress.com/item/1005006217693724.html
// https://www.aliexpress.us/item/_p/r1/1005004783921093.html
// https://m.aliexpress.com/item/1005005689304155.html

// Sample DHgate URLs for testing:
// https://www.dhgate.com/product/product-name/12345678.html

/**
 * Extracts product ID from various AliExpress and DHgate URL formats
 */
export function extractProductId(url: string): string | null {
  try {
    console.log("Extracting product ID from URL:", url);
    
    // Determine the source platform
    const isAliExpress = url.includes("aliexpress.com") || url.includes("aliexpress.us");
    const isDHgate = url.includes("dhgate.com");
    
    let productId: string | null = null;
    
    if (isAliExpress) {
      // AliExpress URL patterns
      const patterns = [
        /item\/([\d_]+)(?:\.html)?/i,                  // Standard format: item/1234567890.html
        /item\/_p\/r\d+\/([\d_]+)(?:\.html)?/i,        // US store format: item/_p/r1/1234567890.html
        /\/i\/([\d_]+)(?:\.html)?/i,                   // Short format: /i/1234567890.html
        /product\/([\d_]+)(?:\/|\?|$)/i,               // Product path format
        /\/(\d{6,16})(?:\.html|\?|\/|$)/i,             // Generic number extraction
        /aliexpress\.(?:com|us)\/item\/([\d_]+)/i,      // Direct aliexpress.com or aliexpress.us URLs
        /\/item\/(?:[\w-]+\/)?([\d_]+)(?:\.html|\?|\/|$)/i  // More generic item pattern
      ];
      
      // Try each pattern until we find a match
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match?.[1]) {
          productId = match[1];
          console.log(`Matched AliExpress pattern ${pattern}, extracted ID: ${productId}`);
          break;
        }
      }
    } else if (isDHgate) {
      // DHgate URL patterns
      const patterns = [
        /product\/[\w-]+\/(\d+)\.html/i,               // Standard format: product/product-name/12345678.html
        /\/(\d{6,12})\.html/i,                         // Short format: /12345678.html
        /productId=(\d+)/i,                            // Query param format: ?productId=12345678
        /\/product\/(\d+)/i                            // Simple path format: /product/12345678
      ];
      
      // Try each pattern until we find a match
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match?.[1]) {
          productId = match[1];
          console.log(`Matched DHgate pattern ${pattern}, extracted ID: ${productId}`);
          break;
        }
      }
    }
    
    // Fall back to generic number matching if no pattern matched
    if (!productId) {
      const numberMatch = url.match(/(\d{6,16})/);
      if (numberMatch?.[1]) {
        productId = numberMatch[1];
        console.log(`Using generic number extraction, found ID: ${productId}`);
      }
    }
    
    console.log("Final extracted product ID:", productId);
    return productId;
  } catch (error) {
    console.error("Error extracting product ID:", error);
    return null;
  }
}

/**
 * Fetch product metadata using the Netlify serverless function
 * Falls back to client-side generation if the function fails
 * 
 * IMPORTANT: For production builds, we need to ensure this works
 * both in development and production environments
 */
export async function fetchProductMetadata(url: string): Promise<ProductInfo | null> {
  try {
    console.log("Fetching product metadata from URL:", url);
    
    // Call the Netlify serverless function to extract real metadata
    console.log("Calling extract-product-metadata function...");
    
    try {
      const response = await fetch('/netlify/functions/extract-product-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
        // Add a reasonable timeout
        signal: AbortSignal.timeout(15000) // 15 second timeout (scraping can take time)
      });
      
      if (!response.ok) {
        throw new Error(`Function failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Product data from function:", data);
      
      // Check if we got valid data back
      if (data && data.productTitle && data.price) {
        return data as ProductInfo;
      } else {
        throw new Error("Invalid data returned from function");
      }
    } catch (functionError) {
      console.error("Netlify function error:", functionError);
      
      // Try alternative path (might be a path issue)
      try {
        console.log("Trying alternative function path...");
        const altResponse = await fetch('/.netlify/functions/extract-product-metadata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
          signal: AbortSignal.timeout(15000)
        });
        
        if (!altResponse.ok) {
          throw new Error(`Alternative path failed: ${altResponse.status}`);
        }
        
        const altData = await altResponse.json();
        console.log("Product data from alternative path:", altData);
        
        if (altData && altData.productTitle && altData.price) {
          return altData as ProductInfo;
        }
      } catch (altError) {
        console.error("Alternative path also failed:", altError);
      }
      
      // If both paths fail, we don't fall back - we require the user to manually enter data
      throw new Error("Could not extract product data from URL, please use manual entry");
    }
  } catch (error) {
    console.error("Error in fetchProductMetadata:", error);
    // We don't fall back to generated data - require manual entry instead
    throw error;
  }
}

// These metadata extraction functions were removed as they rely on JSDOM
// In a real application, these would be implemented in a serverless function
// For the Netlify static site build, we're using only the fallback generator

/**
 * Generate a fallback product with deterministic properties based on product ID
 */
function generateFallbackProduct(productId: string): ProductInfo {
  // Generate deterministic but varied values based on the product ID
  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const hash = hashCode(productId);

  // Use the hash to create deterministic but seemingly random values
  const price = 500000 + (hash % 300000); // Price between $500k and $800k
  const weight = 1000 + (hash % 5000); // Weight between 1000kg and 6000kg
  const stock = 1 + (hash % 5); // Available stock between 1 and 5 units

  // Create descriptive title based on ID
  const titles = [
    `High-Performance Industrial Generator Model ${productId.slice(-4)}`,
    `Commercial-Grade CNC Machine System ${productId.slice(-4)}`,
    `Large-Format Digital Printing Equipment ${productId.slice(-4)}`,
    `Industrial Automation Robot ARM-${productId.slice(-4)}`,
    `Medical Imaging Equipment MRI-${productId.slice(-4)}`,
    `Heavy Construction Equipment Model ${productId.slice(-4)}`,
    `Pharmaceutical Manufacturing System ${productId.slice(-4)}`,
    `Industrial 3D Printing System ${productId.slice(-4)}`
  ];

  const titleIndex = hash % titles.length;

  return {
    productTitle: titles[titleIndex],
    price: price,
    imageUrl: `https://source.unsplash.com/random/800x600/?industrial+machinery&sig=${productId.slice(-4)}`,
    estimatedWeight: weight,
    availableStock: stock
  };
}

/**
 * Fetch product details from URL
 * Uses Netlify serverless function for real metadata extraction
 * Important: We don't fall back to generated data - we want real data only
 */
export async function fetchProductFromUrl(url: string): Promise<ProductInfo | null> {
  try {
    console.log("Fetching product from URL:", url);
    
    // This will throw an error if it can't fetch real data
    const product = await fetchProductMetadata(url);
    
    // Log success
    console.log("Successfully fetched real product from URL:", product);
    return product;
  } catch (error) {
    // Log the error but don't provide fallback data
    console.error("Error in fetchProductFromUrl:", error);
    
    // We propagate the error
    if (error instanceof Error) {
      throw new Error(`Could not fetch product data: ${error.message}`);
    } else {
      throw new Error("Could not fetch product data, please use manual input");
    }
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