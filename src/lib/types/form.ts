import { z } from "zod";

// Form type for URL upload path
export const urlUploadSchema = z.object({
  productUrl: z.string().url("Please enter a valid URL"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  formType: z.literal("url"),
  buyerAddress: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  confirmAccurate: z.boolean().refine(val => val === true, {
    message: "You must confirm the information is accurate",
  }),
  confirmDeliveryTerms: z.boolean().refine(val => val === true, {
    message: "You must confirm the delivery terms",
  }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
});

// Form type for manual supplier input
export const manualInputSchema = z.object({
  formType: z.literal("manual"),
  supplierName: z.string().min(1, "Supplier name is required"),
<<<<<<< HEAD
  productCategory: z.string().min(1, "Product category is required"), // Added product category field
=======
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
  productDescription: z.string().min(1, "Product description is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  estimatedWeight: z.number().min(0.01, "Weight must be greater than 0"),
  shippingFromCity: z.string().min(1, "Shipping city is required"),
  productImage: z.string().optional(),
  buyerAddress: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  confirmAccurate: z.boolean().refine(val => val === true, {
    message: "You must confirm the information is accurate",
  }),
  confirmDeliveryTerms: z.boolean().refine(val => val === true, {
    message: "You must confirm the delivery terms",
  }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
});

export const freightFormSchema = z.discriminatedUnion("formType", [
  urlUploadSchema,
  manualInputSchema
]);

export type FreightFormValues = z.infer<typeof freightFormSchema>;
export type UrlUploadFormValues = z.infer<typeof urlUploadSchema>;
export type ManualInputFormValues = z.infer<typeof manualInputSchema>;

export interface ProductInfo {
  productTitle: string;
  price: number;
  imageUrl: string;
  estimatedWeight: number;
  availableStock?: number; // Add available stock property
<<<<<<< HEAD
  productCategory?: string; // Add product category property
=======
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}
