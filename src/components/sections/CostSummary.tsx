"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { type FreightFormValues, type ProductInfo, ShippingOption } from "@/lib/types/form";
import { calculateServiceFee, calculateShippingOptions, calculateTotal } from "@/lib/api/product";
import { saveFormDataToDatabase, generateReceipt } from "@/lib/api/payment";
import { sendConfirmationEmail, sendAdminNotification } from "@/lib/api/email";
import { Label } from "@/components/ui/label";
import { CheckIcon, ChevronLeft, Loader2 } from "lucide-react";
import { createPaymentIntent } from "@/lib/api/payment";
import { toast } from "sonner";
<<<<<<< HEAD
=======
import Image from "next/image";
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { canSubmit, addSubmission, getTimeUntilNextWindow } from "@/lib/api/submissionTracker";
<<<<<<< HEAD
import { Skeleton } from "@/components/ui/skeleton";
=======
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869

interface CostSummaryProps {
  productInfo: ProductInfo | null;
  formData: FreightFormValues;
  selectedShippingOption: string | null;
  onBack: () => void;
}

export function CostSummary({ productInfo, formData, selectedShippingOption, onBack }: CostSummaryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>(process.env.DEFAULT_CURRENCY || 'USD');
  const [submissionStatus, setSubmissionStatus] = useState(() => canSubmit());
  const [timeUntilNextWindow, setTimeUntilNextWindow] = useState<string>('');
<<<<<<< HEAD
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
=======
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869

  // Debug logging to track component state
  useEffect(() => {
    console.log("CostSummary mounted with props:", {
      productInfo,
      formData,
      selectedShippingOption,
      submissionStatus
    });
  }, [productInfo, formData, selectedShippingOption, submissionStatus]);

  // Check submission cap on component load
  useEffect(() => {
    try {
      const status = canSubmit();
      setSubmissionStatus(status);

      if (!status.allowed) {
        const timeLeft = getTimeUntilNextWindow();
        setTimeUntilNextWindow(timeLeft);
      }
    } catch (error) {
      console.error("Error checking submission status:", error);
    }
  }, []);

  // Get shipping options and find the selected one
  const shippingOptions = productInfo
    ? calculateShippingOptions(productInfo.estimatedWeight, formData.buyerAddress)
    : [];

  const selectedShipping = shippingOptions.find(option => option.id === selectedShippingOption) || { name: 'Standard', price: 0, estimatedDays: 'N/A' };

  // Calculate costs
  const itemPrice = productInfo?.price || 0;
  const itemQuantity = formData.quantity || 1;
  const totalItemPrice = itemPrice * itemQuantity;
  const serviceFee = calculateServiceFee(totalItemPrice);
  const shippingPrice = selectedShipping.price || 0;
  const totalEstimate = calculateTotal(totalItemPrice, serviceFee, shippingPrice);

  // Calculate amount in cents for Stripe
  const serviceFeeInCents = Math.round(serviceFee * 100);

  const handleSubmit = async () => {
    if (!agreeToTerms) {
      toast.error("Please confirm the delivery terms to continue");
      return;
    }

    if (!productInfo || !selectedShipping) {
<<<<<<< HEAD
      toast.error("Missing construction product or shipping information");
=======
      toast.error("Missing product or shipping information");
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
      return;
    }

    // Check if submissions are allowed
    const submissionStatus = canSubmit();
    if (!submissionStatus.allowed) {
      toast.error("Maximum submissions reached. Please try again later.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Creating payment intent for service fee", serviceFeeInCents, currency.toLowerCase());
<<<<<<< HEAD
      // Create payment intent for just the service fee (22%)
=======
      // Create payment intent for just the service fee (12.5%)
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
      const paymentIntent = await createPaymentIntent(serviceFeeInCents, currency.toLowerCase());
      console.log("Payment intent created:", paymentIntent);

      // Save order to database
      const orderData = {
        formData,
        productInfo: {
          title: productInfo.productTitle,
          price: itemPrice,
          weight: productInfo.estimatedWeight,
<<<<<<< HEAD
          image: productInfo.imageUrl,
          category: productInfo.productCategory
=======
          image: productInfo.imageUrl
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
        },
        shipping: {
          method: selectedShipping.name,
          price: shippingPrice,
          estimatedDays: selectedShipping.estimatedDays
        },
        costs: {
          itemPrice: totalItemPrice,
          serviceFee,
          shippingPrice,
          totalEstimate
        },
        paymentIntent: paymentIntent.id,
        status: "pending",
        createdAt: new Date().toISOString()
      };

<<<<<<< HEAD
      console.log("Saving shipment to database...");
=======
      console.log("Saving order to database...");
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
      const saveResult = await saveFormDataToDatabase(orderData);
      console.log("Save result:", saveResult);

      if (saveResult.success) {
        // Track this submission for the cap limit
        addSubmission(saveResult.id);

        // Generate a receipt
        const receipt = await generateReceipt(
          paymentIntent.id,
          {
            name: `${formData.firstName || ''} ${formData.lastName || ''}`,
            email: formData.email || 'customer@example.com'
          },
          serviceFeeInCents,
          currency
        );

        if (receipt.success && receipt.receiptUrl) {
          setReceiptUrl(receipt.receiptUrl);
        }

        // Send confirmation emails
        await Promise.all([
          sendConfirmationEmail({
            form: formData,
            productTitle: productInfo.productTitle,
            productPrice: totalItemPrice,
            serviceFee,
            shippingOption: {
              name: selectedShipping.name,
              price: shippingPrice,
              estimatedDays: selectedShipping.estimatedDays
            },
            totalEstimate
          }),
          sendAdminNotification({
            form: formData,
            productTitle: productInfo.productTitle,
            productPrice: totalItemPrice,
            serviceFee,
            shippingOption: {
              name: selectedShipping.name,
              price: shippingPrice,
              estimatedDays: selectedShipping.estimatedDays
            },
            totalEstimate
          })
        ]);

        setOrderId(saveResult.id);
        setOrderComplete(true);
<<<<<<< HEAD
        toast.success("Construction shipment quote submitted successfully");
=======
        toast.success("Quote submitted successfully");
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869

        // Update submission status after successful submission
        setSubmissionStatus(canSubmit());
      } else {
<<<<<<< HEAD
        toast.error("Error processing your construction shipment");
      }
    } catch (error) {
      console.error("Error processing shipment:", error);
      toast.error("Error processing your construction shipment");
=======
        toast.error("Error processing your order");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Error processing your order");
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnHome = () => {
    window.location.href = "/";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

<<<<<<< HEAD
  // Render currency selection based on client-side state
  const renderCurrencySelector = () => {
    if (!isClient) {
      return (
        <div className="mb-4">
          <Label htmlFor="currency" className="mb-2 block">Currency</Label>
          <Skeleton className="h-10 w-full" />
        </div>
      );
    }

    return (
      <div className="mb-4">
        <Label htmlFor="currency" className="mb-2 block">Currency</Label>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger>
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD - US Dollar</SelectItem>
            <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };

=======
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
  // Show submission cap reached message
  if (!submissionStatus.allowed) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <ExclamationTriangleIcon className="h-6 w-6 text-amber-600" />
          </div>
<<<<<<< HEAD
          <CardTitle className="text-2xl">Construction Corridor Intake Limit Reached</CardTitle>
          <CardDescription>
            This construction corridor intake window has reached its temporary limit. Please check back once the next signal is issued.
=======
          <CardTitle className="text-2xl">Corridor Intake Limit Reached</CardTitle>
          <CardDescription>
            This corridor intake window has reached its temporary limit. Please check back once the next signal is issued.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {timeUntilNextWindow && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-medium text-amber-800">Next Window Opens In</h3>
              <p className="mt-1 text-sm text-amber-700">{timeUntilNextWindow}</p>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
<<<<<<< HEAD
            For urgent construction shipment inquiries, please contact us at{" "}
=======
            For urgent inquiries, please contact us at{" "}
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
            <a href="mailto:freightnode@buildcoprojects.com.au" className="text-primary hover:underline">
              freightnode@buildcoprojects.com.au
            </a>
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleReturnHome}>
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Order completion view
  if (orderComplete) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckIcon className="h-6 w-6 text-green-600" />
          </div>
<<<<<<< HEAD
          <CardTitle className="text-2xl">Construction Shipment Quote Submitted Successfully</CardTitle>
          <CardDescription>
            Your construction hardware quote request has been submitted for review. We will contact you shortly.
=======
          <CardTitle className="text-2xl">Quote Submitted Successfully</CardTitle>
          <CardDescription>
            Your quote request has been submitted for review. We will contact you shortly.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border p-4">
<<<<<<< HEAD
            <h3 className="font-medium">Shipment Reference</h3>
=======
            <h3 className="font-medium">Order Reference</h3>
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
            <p className="mt-1 text-sm">{orderId}</p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Payment Details</h3>
            <p className="mt-1 text-sm">
<<<<<<< HEAD
              Service Fee: {formatCurrency(serviceFee)} (USD)
=======
              Service Fee: {formatCurrency(serviceFee)} ({currency})
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
            </p>
            {receiptUrl && (
              <p className="mt-2">
                <a
                  href={receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Receipt
                </a>
              </p>
            )}
            <p className="mt-4 text-sm text-muted-foreground">
<<<<<<< HEAD
              This receipt confirms your 22% corridor access fee has been processed.
=======
              This receipt confirms your 12.5% service fee has been processed.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Next Steps</h3>
            <ul className="mt-2 space-y-2 text-sm">
<<<<<<< HEAD
              <li>1. We will review your construction shipment request</li>
              <li>2. You will receive a confirmation email</li>
              <li>3. Our team will contact you to finalize the shipment</li>
              <li>4. Once confirmed, your construction hardware will be processed</li>
=======
              <li>1. We will review your quote request</li>
              <li>2. You will receive a confirmation email</li>
              <li>3. Our team will contact you to finalize the order</li>
              <li>4. Once confirmed, your order will be processed</li>
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
            </ul>
          </div>

          <p className="text-center text-sm text-muted-foreground">
<<<<<<< HEAD
            If you have any questions about your construction shipment, please contact us at{" "}
=======
            If you have any questions, please contact us at{" "}
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
            <a href="mailto:freightnode@buildcoprojects.com.au" className="text-primary hover:underline">
              freightnode@buildcoprojects.com.au
            </a>
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleReturnHome}>
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Button
        variant="outline"
        className="flex items-center"
        onClick={onBack}
      >
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Shipping
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
<<<<<<< HEAD
              <CardTitle>Construction Shipment Summary</CardTitle>
              <CardDescription>
                Review your construction hardware details before submitting
=======
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Review your order details before submitting
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Info */}
              <div className="flex gap-4">
                {productInfo?.imageUrl && (
                  <div className="h-20 w-20 overflow-hidden rounded-md">
<<<<<<< HEAD
                    <img
                      src={productInfo.imageUrl}
                      alt={productInfo.productTitle}
=======
                    <Image
                      src={productInfo.imageUrl}
                      alt={productInfo.productTitle}
                      width={80}
                      height={80}
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium">{productInfo?.productTitle}</h3>
<<<<<<< HEAD
                  {productInfo?.productCategory && (
                    <p className="text-xs text-muted-foreground">Category: {productInfo.productCategory}</p>
                  )}
=======
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                  <p className="text-sm text-muted-foreground">
                    Quantity: {itemQuantity} x {formatCurrency(itemPrice)} = {formatCurrency(totalItemPrice)}
                  </p>
                  <p className="text-sm text-muted-foreground">Weight: {productInfo?.estimatedWeight?.toFixed(2) || 'N/A'} kg</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-lg border p-3">
<<<<<<< HEAD
                <h3 className="mb-2 text-sm font-medium">Construction Site Delivery Address</h3>
=======
                <h3 className="mb-2 text-sm font-medium">Shipping Address</h3>
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                <p className="text-sm text-muted-foreground">
                  {formData.buyerAddress.city || 'City'}, {formData.buyerAddress.state || 'State'}, {formData.buyerAddress.zipCode || 'Zip Code'}
                  <br />
                  {formData.buyerAddress.country || 'Country'}
                </p>
              </div>

              {/* Shipping Method */}
              <div className="rounded-lg border p-3">
                <h3 className="mb-2 text-sm font-medium">Shipping Method</h3>
                <p className="text-sm">
                  {selectedShipping?.name}{" "}
                  <span className="text-muted-foreground">({selectedShipping?.estimatedDays || 'N/A'})</span>
                </p>
              </div>

              {/* Submission Limit Info */}
              <Alert variant="outline" className="border-blue-200 bg-blue-50">
                <InfoCircledIcon className="h-4 w-4 text-blue-600" />
<<<<<<< HEAD
                <AlertTitle className="text-blue-700">Construction Corridor Limits</AlertTitle>
=======
                <AlertTitle className="text-blue-700">Submission Limits</AlertTitle>
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                <AlertDescription className="text-blue-600">
                  You have {submissionStatus.remainingSubmissions} of 3 possible submissions available in the current 48-hour window.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Cost Summary</CardTitle>
              <CardDescription>
<<<<<<< HEAD
                Review the costs for your construction shipment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderCurrencySelector()}

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm">Total Construction Hardware Price</p>
                  <p className="text-sm font-medium">{formatCurrency(totalItemPrice)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Corridor Access Fee (22%)</p>
=======
                Review the costs for your order
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <Label htmlFor="currency" className="mb-2 block">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm">Total Item Price</p>
                  <p className="text-sm font-medium">{formatCurrency(totalItemPrice)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Service Fee (12.5%)</p>
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                  <p className="text-sm font-medium">{formatCurrency(serviceFee)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Shipping</p>
                  <p className="text-sm font-medium">{formatCurrency(shippingPrice)}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
<<<<<<< HEAD
                  Construction hardware shipping fees are based on weight and distance. A variable per-kg fee will be included in the final quote.
=======
                  Shipping fees are based on weight and distance. A variable per-kg fee will be included in the final quote.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                </p>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <p className="font-medium">Total Estimate</p>
                    <p className="font-medium">{formatCurrency(totalEstimate)}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Excluding taxes/customs</p>
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-blue-50 my-4">
                <p className="text-sm font-medium mb-1">Payment Details</p>
                <p className="text-sm">
<<<<<<< HEAD
                  You will be charged the non-refundable 22% corridor access fee of {formatCurrency(serviceFee)} upon accepting this quote.
=======
                  You will be charged the non-refundable 12.5% service fee of {formatCurrency(serviceFee)} upon accepting this quote.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                </p>
                <p className="text-sm mt-2">
                  The remaining amount will be invoiced after confirmation.
                </p>
              </div>

              <div className="mt-6 rounded-lg border p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  />
                  <div>
                    <Label htmlFor="terms" className="font-medium">
<<<<<<< HEAD
                      Construction Delivery Terms Agreement
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      I confirm that delivery time estimates for construction materials are non-binding. Refunds are not issued for delays unless the item is undelivered after 45 calendar days.
=======
                      Delivery Terms Agreement
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      I confirm that delivery time estimates are non-binding. Refunds are not issued for delays unless the item is undelivered after 45 calendar days.
>>>>>>> 340e3cc1d6d4db7967a57a80b837e2771c737869
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={isSubmitting || !agreeToTerms}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Accept Quote & Pay Fee"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
