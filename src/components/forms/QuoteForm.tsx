"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { type FreightFormValues, urlUploadSchema, manualInputSchema } from "@/lib/types/form";
import { fetchProductFromUrl, checkMinimumOrderAmount, checkStockAvailability } from "@/lib/api/product";
import { ShippingSection } from "../sections/ShippingSection";
import { CostSummary } from "../sections/CostSummary";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { canSubmit } from "@/lib/api/submissionTracker";
import { CourierModal } from "@/components/ui/courier-modal";

export default function QuoteForm() {
  const [formType, setFormType] = useState<"url" | "manual">("url");
  const [isLoading, setIsLoading] = useState(false);
  const [productFetchLoading, setProductFetchLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<{
    productTitle: string;
    price: number;
    imageUrl: string;
    estimatedWeight: number;
    availableStock?: number;
  } | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<Partial<FreightFormValues>>({});
  const [selectedShippingOption, setSelectedShippingOption] = useState<string | null>(null);
  const [orderValidation, setOrderValidation] = useState<{
    isValid: boolean;
    shortfallAmount: number;
  } | null>(null);
  const [stockValidation, setStockValidation] = useState<{
    isAvailable: boolean;
    availableStock: number;
  } | null>(null);
  const [totalOrderAmount, setTotalOrderAmount] = useState<number>(0);
  const [submissionStatus, setSubmissionStatus] = useState(() => canSubmit());
  const [showCourierModal, setShowCourierModal] = useState(false);
  const [urlProcessed, setUrlProcessed] = useState(false);

  // Add reference to product details section for scrolling
  const productDetailsRef = useRef<HTMLDivElement>(null);
  const confirmCheckboxRef = useRef<HTMLDivElement>(null);

  // Enhanced stable reference to prevent re-renders
  const stableProductInfoRef = useRef<typeof productInfo>(null);
  const previousUrlRef = useRef<string>("");

  // Track if we've already shown product details to prevent UI flicker
  const [productDetailsVisible, setProductDetailsVisible] = useState(false);

  // Add state to ensure product section remains displayed after a successful fetch
  const [showProductDetails, setShowProductDetails] = useState(false);

  // Add new state to track form validity
  const [isUrlFormValid, setIsUrlFormValid] = useState(false);
  const [isManualFormValid, setIsManualFormValid] = useState(false);

  // Create a debounced URL value to prevent excessive API calls
  const [debouncedUrl, setDebouncedUrl] = useState("");
  const urlDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize forms
  const urlForm = useForm<z.infer<typeof urlUploadSchema>>({
    resolver: zodResolver(urlUploadSchema),
    defaultValues: {
      formType: "url",
      productUrl: "",
      quantity: 1,
      confirmAccurate: false,
      confirmDeliveryTerms: false,
      buyerAddress: {
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
      },
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const manualForm = useForm<z.infer<typeof manualInputSchema>>({
    resolver: zodResolver(manualInputSchema),
    defaultValues: {
      formType: "manual",
      supplierName: "",
      productDescription: "",
      price: 0,
      quantity: 1,
      estimatedWeight: 0,
      shippingFromCity: "",
      buyerAddress: {
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
      },
      confirmAccurate: false,
      confirmDeliveryTerms: false,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Watch form values to check validity
  const urlFormValues = urlForm.watch();
  const manualFormValues = manualForm.watch();
  const productUrl = urlForm.watch("productUrl");
  const confirmAccurate = urlForm.watch("confirmAccurate");
  const urlQuantity = urlForm.watch("quantity");

  // Debounce the URL change to prevent excessive API calls
  useEffect(() => {
    if (urlDebounceTimerRef.current) {
      clearTimeout(urlDebounceTimerRef.current);
    }

    // Only update debounced URL if it's different from the current one
    if (productUrl !== debouncedUrl) {
      urlDebounceTimerRef.current = setTimeout(() => {
        setDebouncedUrl(productUrl);
      }, 800);
    }

    return () => {
      if (urlDebounceTimerRef.current) {
        clearTimeout(urlDebounceTimerRef.current);
      }
    };
  }, [productUrl, debouncedUrl]);

  // Enhanced effect to always fetch and display product info when URL changes
  useEffect(() => {
    if (!debouncedUrl || productFetchLoading) return;

    // Only skip if exactly the same URL and we already have product info
    if (debouncedUrl === previousUrlRef.current && productInfo) return;

    const fetchProductInfo = async () => {
      try {
        // More comprehensive URL validation for AliExpress or DHgate
        const isValidUrl = (url: string): boolean => {
          // Must start with http or https
          if (!url.startsWith('http')) return false;
          
          // Check for minimum length and domain name
          if (url.length < 15 || !url.includes('.')) return false;
          
          // Check if it's an AliExpress or DHgate URL (main targets for our app)
          const isAliExpress = url.includes('aliexpress.com') || url.includes('aliexpress.us');
          const isDHgate = url.includes('dhgate.com');
          
          // We'll also accept other URLs but log them
          if (!isAliExpress && !isDHgate) {
            console.log("URL is not from AliExpress or DHgate, but will attempt extraction anyway");
          }
          
          return true;
        };

        if (!isValidUrl(debouncedUrl)) {
          console.log("URL validation failed, not fetching product info");
          return;
        }

        // Show loading state
        setProductFetchLoading(true);

        // Store current URL to prevent duplicate fetches
        previousUrlRef.current = debouncedUrl;

        console.log("Auto-fetching product info for URL:", debouncedUrl);
        const productData = await fetchProductFromUrl(debouncedUrl);

        if (productData?.productTitle) {
          console.log("Auto-fetch successful:", productData);

          // Always update the product info state
          setProductInfo(productData);
          setUrlProcessed(true);
          setProductDetailsVisible(true);
          setShowProductDetails(true);

          // Update validation info
          const validation = checkMinimumOrderAmount(productData.price, urlQuantity);
          setOrderValidation(validation);
          setTotalOrderAmount(productData.price * urlQuantity);

          if (productData.availableStock !== undefined) {
            const stockCheck = checkStockAvailability(urlQuantity, productData.availableStock);
            setStockValidation(stockCheck);
          }

          toast.success("Product information retrieved");

          // Scroll to product details after a short delay
          setTimeout(() => {
            if (productDetailsRef.current) {
              productDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 300);
        } else {
          console.warn("Could not fetch product data automatically");
          setUrlProcessed(false);
          setShowProductDetails(false);
          toast.error("Could not retrieve product information. Please try another URL.");
        }
      } catch (error) {
        console.error("Error auto-fetching product:", error);
        toast.error("Error fetching product data. Please try again.");
      } finally {
        setProductFetchLoading(false);
      }
    };

    fetchProductInfo();
  }, [debouncedUrl, urlQuantity]);

  // State to track payment section visibility
  const [isPaymentSectionUnlocked, setIsPaymentSectionUnlocked] = useState(false);
  const paymentSectionRef = useRef<HTMLDivElement>(null);

  // Check URL form validity and progressively disclose payment section
  useEffect(() => {
    const { quantity } = urlFormValues;

    // Form is valid when we have:
    // 1. A valid product (from URL processing)
    // 2. A quantity greater than 0
    // 3. Order value meets the minimum requirement
    // 4. User has checked the confirmation checkbox
    const meetsPriceThreshold = orderValidation?.isValid === true;
    const formFieldsValid = urlProcessed &&
                           productInfo !== null &&
                           quantity > 0 &&
                           confirmAccurate === true &&
                           meetsPriceThreshold;

    console.log("URL form validity check:", {
      urlProcessed,
      hasProductInfo: productInfo !== null,
      quantity,
      meetsPriceThreshold,
      confirmAccurate,
      formFieldsValid
    });

    setIsUrlFormValid(formFieldsValid);

    // Set payment section visibility based on order value threshold
    const shouldUnlockPayment = productInfo !== null && 
                               quantity > 0 && 
                               meetsPriceThreshold;

    setIsPaymentSectionUnlocked(shouldUnlockPayment);

    // If payment section is newly unlocked, scroll to it after a short delay
    if (shouldUnlockPayment && !isPaymentSectionUnlocked && confirmCheckboxRef.current) {
      setTimeout(() => {
        confirmCheckboxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [urlProcessed, productInfo, urlFormValues, confirmAccurate, orderValidation, isPaymentSectionUnlocked]);

  // Manual form payment section state
  const [isManualPaymentSectionUnlocked, setIsManualPaymentSectionUnlocked] = useState(false);
  const manualConfirmCheckboxRef = useRef<HTMLDivElement>(null);

  // Check manual form validity and handle progressive disclosure
  useEffect(() => {
    const {
      supplierName,
      productDescription,
      price,
      quantity,
      estimatedWeight,
      shippingFromCity,
      confirmAccurate
    } = manualFormValues;

    // Check if price threshold is met
    const meetsPriceThreshold = orderValidation?.isValid === true;

    const formFieldsValid =
      !!supplierName &&
      !!productDescription &&
      price > 0 &&
      quantity > 0 &&
      estimatedWeight > 0 &&
      !!shippingFromCity &&
      confirmAccurate &&
      meetsPriceThreshold;

    setIsManualFormValid(formFieldsValid);

    // Set payment section visibility based on order value threshold
    const shouldUnlockPayment = 
      price > 0 && 
      quantity > 0 && 
      meetsPriceThreshold;

    setIsManualPaymentSectionUnlocked(shouldUnlockPayment);

    // If payment section is newly unlocked, scroll to it
    if (shouldUnlockPayment && !isManualPaymentSectionUnlocked && manualConfirmCheckboxRef.current) {
      setTimeout(() => {
        manualConfirmCheckboxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [manualFormValues, orderValidation, isManualPaymentSectionUnlocked]);

  // For the manual form, watch price and quantity to recalculate order value when they change
  const manualPrice = manualForm.watch("price");
  const manualQuantity = manualForm.watch("quantity");

  // Check submission limits on component load
  useEffect(() => {
    const status = canSubmit();
    setSubmissionStatus(status);
  }, []);

  // Recalculate validation for URL form when quantity changes
  useEffect(() => {
    if (productInfo && formType === "url") {
      try {
        console.log("Recalculating URL form validation:", { productInfo, urlQuantity });
        const validation = checkMinimumOrderAmount(productInfo.price, urlQuantity || 1);
        setOrderValidation(validation);
        setTotalOrderAmount(productInfo.price * (urlQuantity || 1));

        if (productInfo.availableStock !== undefined) {
          const stockCheck = checkStockAvailability(urlQuantity || 1, productInfo.availableStock);
          setStockValidation(stockCheck);
        }
      } catch (error) {
        console.error("Error in URL validation effect:", error);
      }
    }
  }, [productInfo, formType, urlQuantity]);

  // Recalculate validation for manual form when price or quantity changes
  useEffect(() => {
    if (formType === "manual") {
      try {
        console.log("Recalculating manual form validation:", { manualPrice, manualQuantity });
        const validation = checkMinimumOrderAmount(manualPrice || 0, manualQuantity || 1);
        setOrderValidation(validation);
        setTotalOrderAmount((manualPrice || 0) * (manualQuantity || 1));
      } catch (error) {
        console.error("Error in manual validation effect:", error);
      }
    }
  }, [formType, manualPrice, manualQuantity]);

  // Update submission status whenever user returns to form
  useEffect(() => {
    if (step === 1) {
      setSubmissionStatus(canSubmit());
    }
  }, [step]);

  const handleUrlFormSubmit = async (data: z.infer<typeof urlUploadSchema>) => {
    const currentSubmissionStatus = canSubmit();
    if (!currentSubmissionStatus.allowed) {
      toast.error("Maximum submissions reached. Please try again later.");
      return;
    }

    console.log("Starting URL form submission:", data);
    console.log("Current form state:", {
      isUrlFormValid,
      urlProcessed,
      productInfo,
      orderValidation,
      stockValidation
    });

    setIsLoading(true);
    try {
      // Only fetch product data if we don't already have it
      if (!productInfo || !urlProcessed) {
        setProductFetchLoading(true);

        const productData = await fetchProductFromUrl(data.productUrl);
        console.log("Product data fetched:", productData);

        if (productData) {
          setProductInfo(productData);
          setUrlProcessed(true);

          const validation = checkMinimumOrderAmount(productData.price, data.quantity);
          setOrderValidation(validation);
          setTotalOrderAmount(productData.price * data.quantity);

          if (productData.availableStock !== undefined) {
            const stockCheck = checkStockAvailability(data.quantity, productData.availableStock);
            setStockValidation(stockCheck);
          }

          // If fetching just now, check validations
          if (!validation.isValid) {
            toast.error("Order total is below the minimum requirement of $500,000");
            setIsLoading(false);
            setProductFetchLoading(false);
            return;
          }

          if (stockValidation && !stockValidation.isAvailable) {
            toast.error("The requested quantity exceeds the supplier's available inventory");
            setIsLoading(false);
            setProductFetchLoading(false);
            return;
          }
        } else {
          toast.error("Could not retrieve product information");
          setIsLoading(false);
          setProductFetchLoading(false);
          return;
        }

        setProductFetchLoading(false);
      }

      setFormData({
        ...data,
        formType: "url"
      });

      // Check if requirements are met before proceeding
      const formIsValid = productInfo &&
                         orderValidation?.isValid &&
                         (!stockValidation || stockValidation.isAvailable);

      if (formIsValid) {
        console.log("Form is valid, showing courier modal");
        setShowCourierModal(true);
      } else {
        console.error("Form validation failed:", {
          hasProductInfo: !!productInfo,
          orderValidation,
          stockValidation
        });

        if (!orderValidation?.isValid) {
          toast.error("Order total is below the minimum requirement of $500,000");
        } else if (stockValidation && !stockValidation.isAvailable) {
          toast.error("The requested quantity exceeds the supplier's available inventory");
        } else {
          toast.error("Please ensure all form requirements are met");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error processing form submission");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualFormSubmit = async (data: z.infer<typeof manualInputSchema>) => {
    const currentSubmissionStatus = canSubmit();
    if (!currentSubmissionStatus.allowed) {
      toast.error("Maximum submissions reached. Please try again later.");
      return;
    }

    console.log("Starting manual form submission:", data);

    setIsLoading(true);
    try {
      // Calculate validation
      const validation = checkMinimumOrderAmount(data.price, data.quantity);
      setOrderValidation(validation);
      setTotalOrderAmount(data.price * data.quantity);

      if (!validation.isValid) {
        toast.error("Order total is below the minimum requirement of $500,000");
        setIsLoading(false);
        return;
      }

      // Set product information for later use
      setProductInfo({
        productTitle: data.productDescription,
        price: data.price,
        imageUrl: data.productImage || "https://source.unsplash.com/random/800x600/?product",
        estimatedWeight: data.estimatedWeight,
      });

      // Save form data for later steps
      setFormData({
        ...data,
        formType: "manual"
      });

      // Show courier modal to proceed to next step
      console.log("Manual form is valid, showing courier modal");
      setShowCourierModal(true);
    } catch (error) {
      console.error("Error in manual form submission:", error);
      toast.error("Error processing form submission");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseCourierModal = () => {
    setShowCourierModal(false);
    console.log("Form step before:", step);

    // Use a more reliable approach to update the step
    setTimeout(() => {
      try {
        console.log("Advancing to shipping step...");
        setStep(2);
        console.log("Form step after:", 2); // Log the actual value we're setting
        toast.success("Product information verified, proceeding to shipping options");
      } catch (error) {
        console.error("Error advancing to shipping step:", error);
        setStep(2); // Direct call as fallback
      }
    }, 300);
  };

  const handleShippingSubmit = (shippingOption: string) => {
    console.log("Shipping option selected:", shippingOption);
    setSelectedShippingOption(shippingOption);

    // Advance to payment/summary step
    setStep(3);
    toast.success("Shipping option selected");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleUpdateUrlQuantity = (value: number) => {
    urlForm.setValue("quantity", value);
    if (productInfo) {
      const validation = checkMinimumOrderAmount(productInfo.price, value);
      setOrderValidation(validation);
      setTotalOrderAmount(productInfo.price * value);
      if (productInfo.availableStock !== undefined) {
        const stockCheck = checkStockAvailability(value, productInfo.availableStock);
        setStockValidation(stockCheck);
      }
    }
  };

  const handleUpdateManualQuantity = (value: number) => {
    manualForm.setValue("quantity", value);
    const validation = checkMinimumOrderAmount(manualPrice || 0, value);
    setOrderValidation(validation);
    setTotalOrderAmount((manualPrice || 0) * value);
  };

  const renderFormStep = () => {
    if (step === 1 && !submissionStatus.allowed) {
      return (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
              <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 dark:text-amber-300" />
            </div>
            <CardTitle>Corridor Intake Limit Reached</CardTitle>
            <CardDescription>
              This corridor intake window has reached its temporary limit. Please check back once the next signal is issued.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <p className="text-center text-sm text-muted-foreground">
              For urgent inquiries, please contact us at{" "}
              <a href="mailto:freightnode@buildcoprojects.com.au" className="text-primary hover:underline">
                freightnode@buildcoprojects.com.au
              </a>
            </p>
          </CardContent>
        </Card>
      );
    }

    switch (step) {
      case 1:
        return (
          <Tabs
            defaultValue="url"
            value={formType}
            onValueChange={(value) => setFormType(value as "url" | "manual")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">Link Upload</TabsTrigger>
              <TabsTrigger value="manual">Manual Input</TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="mt-6">
              <Card className="dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Product URL</CardTitle>
                  <CardDescription>
                    Paste an AliExpress or supplier URL to automatically fill in product details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...urlForm}>
                    <form onSubmit={urlForm.handleSubmit(handleUrlFormSubmit)} className="space-y-6">
                      <FormField
                        control={urlForm.control}
                        name="productUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product URL</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="https://www.aliexpress.com/item/..."
                                  {...field}
                                  className={`${productFetchLoading ? "pr-10" : ""} ${
                                    isPaymentSectionUnlocked ? "border-green-500 focus:ring-green-500/30" : ""
                                  }`}
                                  onBlur={(e) => {
                                    field.onBlur();
                                    // Force product fetch on blur if URL is valid
                                    const url = e.target.value;
                                    if (url && url.startsWith('http') && url.includes('.') && url.length > 15) {
                                      // If the URL is different from the previously processed one
                                      if (url !== previousUrlRef.current) {
                                        // Manually trigger product fetch
                                        setDebouncedUrl(url);
                                      }
                                    }
                                  }}
                                />
                                {productFetchLoading && (
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                  </div>
                                )}
                                {isPaymentSectionUnlocked && !productFetchLoading && (
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={urlForm.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  min="1"
                                  placeholder="Enter quantity"
                                  {...field}
                                  className={isPaymentSectionUnlocked ? "border-green-500 focus:ring-green-500/30" : ""}
                                  onChange={(e) => handleUpdateUrlQuantity(Number.parseInt(e.target.value) || 1)}
                                  onBlur={() => {
                                    // Force validation on blur
                                    if (productInfo) {
                                      const validation = checkMinimumOrderAmount(productInfo.price, field.value);
                                      setOrderValidation(validation);
                                      setTotalOrderAmount(productInfo.price * field.value);
                                    }
                                  }}
                                  value={field.value}
                                />
                                {isPaymentSectionUnlocked && (
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {productInfo && showProductDetails && (
                        <div
                          ref={productDetailsRef}
                          className="rounded-lg border p-4 mt-4 dark:border-gray-700 dark:bg-gray-800/50 transition-opacity duration-300"
                          style={{ opacity: productDetailsVisible ? 1 : 0 }}
                        >
                          <h3 className="text-sm font-medium mb-2">Product Details</h3>
                          <div className="flex items-center gap-4 mb-3">
                            {productInfo.imageUrl && (
                              <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                                <img
                                  src={productInfo.imageUrl}
                                  alt={productInfo.productTitle}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium">{productInfo.productTitle}</p>
                              <p className="text-xs text-muted-foreground">
                                Weight: {productInfo.estimatedWeight.toLocaleString()} kg
                              </p>
                            </div>
                          </div>
                          <div className="text-sm space-y-2 border-t pt-2 dark:border-gray-700">
                            <div className="flex justify-between">
                              <span>Unit Price:</span>
                              <span>{formatCurrency(productInfo.price)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quantity:</span>
                              <span>{urlQuantity || 1}</span>
                            </div>
                            {productInfo.availableStock !== undefined && (
                              <div className="flex justify-between">
                                <span>Available Stock:</span>
                                <span>{productInfo.availableStock}</span>
                              </div>
                            )}
                            <div className="flex justify-between font-semibold border-t pt-2 mt-1 dark:border-gray-700">
                              <span>Total Order Value:</span>
                              <span className={orderValidation?.isValid ? "text-green-600 dark:text-green-400" : ""}>
                                {formatCurrency(totalOrderAmount)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {productInfo && orderValidation && !orderValidation.isValid && (
                        <Alert variant="destructive" className="bg-red-50 border-red-300 dark:bg-red-900/30 dark:border-red-800 warning-banner">
                          <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                          <AlertTitle className="text-red-800 dark:text-red-300 font-semibold">Order Value Too Low</AlertTitle>
                          <AlertDescription className="text-red-700 dark:text-red-300">
                            <p className="font-medium mb-1">Total order value must exceed $500,000 USD to access payment.</p>
                            <p>Your current total: {formatCurrency(totalOrderAmount)} (short by {formatCurrency(orderValidation.shortfallAmount)})</p>
                          </AlertDescription>
                        </Alert>
                      )}

                      {stockValidation && !stockValidation.isAvailable && (
                        <Alert variant="destructive">
                          <ExclamationTriangleIcon className="h-4 w-4" />
                          <AlertTitle>Insufficient Stock</AlertTitle>
                          <AlertDescription>
                            The requested quantity exceeds the supplier's available inventory of {stockValidation.availableStock} units.
                            Please lower your order or choose another product.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div 
                        className={`payment-section transition-all duration-300 ${!isPaymentSectionUnlocked ? 'opacity-50 pointer-events-none' : ''}`}
                        ref={paymentSectionRef}
                      >
                        <FormField
                          control={urlForm.control}
                          name="confirmAccurate"
                          render={({ field }) => (
                            <FormItem ref={confirmCheckboxRef} className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 dark:border-gray-700">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={!isPaymentSectionUnlocked}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  I confirm all info is accurate. The 12.5% service fee is non-refundable if incorrect.
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full mt-4"
                          disabled={
                            isLoading ||
                            productFetchLoading ||
                            !isUrlFormValid ||
                            (orderValidation && !orderValidation.isValid) ||
                            (stockValidation && !stockValidation.isAvailable) ||
                            !isPaymentSectionUnlocked
                          }
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Continue to Shipping"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manual" className="mt-6">
              <Card className="dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Manual Product Information</CardTitle>
                  <CardDescription>
                    Enter the product details manually
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...manualForm}>
                    <form onSubmit={manualForm.handleSubmit(handleManualFormSubmit)} className="space-y-6">
                      <FormField
                        control={manualForm.control}
                        name="supplierName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Supplier Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Supplier name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={manualForm.control}
                        name="productDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describe the product" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                          control={manualForm.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (USD)</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...field}
                                    className={isManualPaymentSectionUnlocked ? "border-green-500 focus:ring-green-500/30" : ""}
                                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                    onBlur={(e) => {
                                      // Force validation on blur
                                      const price = Number.parseFloat(e.target.value) || 0;
                                      const validation = checkMinimumOrderAmount(price, manualQuantity || 1);
                                      setOrderValidation(validation);
                                      setTotalOrderAmount(price * (manualQuantity || 1));
                                    }}
                                  />
                                  {isManualPaymentSectionUnlocked && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                      <CheckCircle className="h-5 w-5 text-green-500" />
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={manualForm.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type="number"
                                    min="1"
                                    step="1"
                                    placeholder="0"
                                    {...field}
                                    className={isManualPaymentSectionUnlocked ? "border-green-500 focus:ring-green-500/30" : ""}
                                    onChange={(e) => handleUpdateManualQuantity(Number.parseInt(e.target.value) || 1)}
                                    onBlur={(e) => {
                                      // Force validation on blur
                                      const quantity = Number.parseInt(e.target.value) || 1;
                                      const validation = checkMinimumOrderAmount(manualPrice || 0, quantity);
                                      setOrderValidation(validation);
                                      setTotalOrderAmount((manualPrice || 0) * quantity);
                                    }}
                                    value={field.value}
                                  />
                                  {isManualPaymentSectionUnlocked && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                      <CheckCircle className="h-5 w-5 text-green-500" />
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {(manualPrice > 0 || manualQuantity > 0) && (
                        <div className="rounded-lg border p-4 mt-4">
                          <h3 className="text-sm font-medium mb-2">Order Summary</h3>
                          <div className="text-sm space-y-2">
                            <div className="flex justify-between">
                              <span>Unit Price:</span>
                              <span>{formatCurrency(manualPrice || 0)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quantity:</span>
                              <span>{manualQuantity || 1}</span>
                            </div>
                            <div className="flex justify-between font-semibold border-t pt-2 mt-1">
                              <span>Total Order Value:</span>
                              <span className={orderValidation?.isValid ? "text-green-600 dark:text-green-400" : ""}>
                                {formatCurrency(totalOrderAmount)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {orderValidation && !orderValidation.isValid && (
                        <Alert variant="destructive" className="bg-red-50 border-red-300 dark:bg-red-900/30 dark:border-red-800 warning-banner">
                          <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                          <AlertTitle className="text-red-800 dark:text-red-300 font-semibold">Order Value Too Low</AlertTitle>
                          <AlertDescription className="text-red-700 dark:text-red-300">
                            <p className="font-medium mb-1">Total order value must exceed $500,000 USD to access payment.</p>
                            <p>Your current total: {formatCurrency(totalOrderAmount)} (short by {formatCurrency(orderValidation.shortfallAmount)})</p>
                          </AlertDescription>
                        </Alert>
                      )}

                      <FormField
                        control={manualForm.control}
                        name="estimatedWeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Weight (kg)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={manualForm.control}
                        name="shippingFromCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shipping From City</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Shenzhen" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div 
                        className={`payment-section transition-all duration-300 ${!isManualPaymentSectionUnlocked ? 'opacity-50 pointer-events-none' : ''}`}
                        ref={manualConfirmCheckboxRef}
                      >
                        <FormField
                          control={manualForm.control}
                          name="confirmAccurate"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 dark:border-gray-700">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={!isManualPaymentSectionUnlocked}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  I confirm all info is accurate. The 12.5% service fee is non-refundable if incorrect.
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full mt-4"
                          disabled={
                            isLoading || 
                            !isManualFormValid || 
                            (orderValidation && !orderValidation.isValid) ||
                            !isManualPaymentSectionUnlocked
                          }
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Continue to Shipping"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        );

      case 2:
        return (
          <ShippingSection
            productInfo={productInfo}
            onSubmit={handleShippingSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        );

      case 3:
        return (
          <CostSummary
            productInfo={productInfo}
            formData={formData as FreightFormValues}
            selectedShippingOption={selectedShippingOption}
            onBack={() => setStep(2)}
          />
        );
    }
  };

  return (
    <section id="quote" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-dark-bg">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-dark-text">
              Reroute Your Order Now
            </h2>
            <p className="max-w-[700px] text-gray-500 dark:text-dark-muted-text md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Enter your product details to get an instant quote for our freight forwarding service.
            </p>

            <p className="text-red-600 dark:text-red-400 font-semibold mt-4 text-center">
              🔒 This service is available for orders of $500,000 USD or more only.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-1">
          {renderFormStep()}
        </div>
      </div>

      {typeof window !== 'undefined' && (
        <CourierModal
          isOpen={showCourierModal}
          onClose={handleCloseCourierModal}
        />
      )}
    </section>
  );
}