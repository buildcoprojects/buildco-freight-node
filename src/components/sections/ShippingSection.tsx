"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import type { FreightFormValues, ProductInfo, ShippingOption } from "@/lib/types/form";
import { calculateShippingOptions } from "@/lib/api/product";
import Image from "next/image";

// Create a schema just for the buyer address
const buyerAddressSchema = z.object({
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
});

type BuyerAddressFormValues = z.infer<typeof buyerAddressSchema>;

interface ShippingSectionProps {
  productInfo: ProductInfo | null;
  formData: Partial<FreightFormValues>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<FreightFormValues>>>;
  onSubmit: (shippingOptionId: string) => void;
}

export function ShippingSection({ productInfo, formData, setFormData, onSubmit }: ShippingSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const form = useForm<BuyerAddressFormValues>({
    resolver: zodResolver(buyerAddressSchema),
    defaultValues: {
      city: formData.buyerAddress?.city || "",
      state: formData.buyerAddress?.state || "",
      zipCode: formData.buyerAddress?.zipCode || "",
      country: formData.buyerAddress?.country || "United States",
    },
  });

  const calculateShipping = async (addressData: BuyerAddressFormValues) => {
    setIsLoading(true);
    try {
      if (productInfo) {
        // Update form data with buyer address
        setFormData({
          ...formData,
          buyerAddress: addressData,
        });

        // Calculate shipping options
        const options = calculateShippingOptions(productInfo.estimatedWeight, addressData);
        setShippingOptions(options);

        // Select the first option by default
        if (options.length > 0) {
          setSelectedOption(options[0].id);
        }
      }
    } catch (error) {
      console.error("Error calculating shipping options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSubmit = (data: BuyerAddressFormValues) => {
    calculateShipping(data);
  };

  const handleShippingConfirm = () => {
    if (selectedOption) {
      onSubmit(selectedOption);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
<<<<<<< HEAD
          <CardTitle>Construction Product Information</CardTitle>
          <CardDescription>
            Review your construction hardware details before proceeding
=======
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Review your product details before proceeding
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {productInfo?.imageUrl && (
              <div className="w-full md:w-1/3">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={productInfo.imageUrl}
                    alt={productInfo.productTitle}
                    width={300}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
            <div className="w-full md:w-2/3">
              <h3 className="text-lg font-semibold mb-2">{productInfo?.productTitle}</h3>
<<<<<<< HEAD
              {productInfo?.productCategory && (
                <p className="text-sm text-muted-foreground mb-2">Category: {productInfo.productCategory}</p>
              )}
=======
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium">${productInfo?.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{productInfo?.estimatedWeight.toFixed(2)} kg</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
<<<<<<< HEAD
          <CardTitle>Construction Site Delivery Address</CardTitle>
=======
          <CardTitle>Delivery Address</CardTitle>
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
          <CardDescription>
            Enter your delivery address to calculate shipping options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddressSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="ZIP Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating Shipping...
                  </>
                ) : (
                  "Calculate Shipping Options"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {shippingOptions.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
<<<<<<< HEAD
            <CardTitle>Construction Hardware Shipping Options</CardTitle>
            <CardDescription>
              Select your preferred shipping method for construction materials
=======
            <CardTitle>Shipping Options</CardTitle>
            <CardDescription>
              Select your preferred shipping method
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <RadioGroup
                value={selectedOption || ""}
                onValueChange={setSelectedOption}
                className="space-y-4"
              >
                {shippingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${
                      selectedOption === option.id ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                        <div className="text-sm text-muted-foreground">Estimated Delivery: {option.estimatedDays}</div>
                      </div>
                    </div>
                    <div className="font-semibold">${option.price.toFixed(2)}</div>
                  </div>
                ))}
              </RadioGroup>

              <div className="text-sm text-muted-foreground mt-4">
<<<<<<< HEAD
                Shipping for construction hardware is calculated separately at cost + fixed handling margin
=======
                Shipping is calculated separately at cost + fixed handling margin
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
              </div>

              <Button
                onClick={handleShippingConfirm}
                className="w-full mt-6"
                disabled={!selectedOption}
              >
                Continue to Summary
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
