"use client";

import * as React from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CourierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CourierModal({ isOpen, onClose }: CourierModalProps) {
  // Add debug logging to monitor modal state
  useEffect(() => {
    console.log("CourierModal mounted, isOpen:", isOpen);
    return () => {
      console.log("CourierModal unmounted");
    };
  }, [isOpen]);

  // Log each time the modal state changes
  useEffect(() => {
    console.log("CourierModal isOpen changed to:", isOpen);
  }, [isOpen]);

  // Safe close handler that checks if onClose is defined
  const handleClose = () => {
    console.log("CourierModal handleClose called");
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error("CourierModal onClose is not a function");
    }
  };

  // Ensure we only render the modal client-side and when isOpen is true
  if (typeof window === 'undefined' || !isOpen) {
    // Server-side or modal not open, render nothing
    return null;
  }

  return (
    <Dialog open={Boolean(isOpen)} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Trusted Delivery Partners</DialogTitle>
          <DialogDescription>
            We ensure your shipment arrives securely and on time.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 text-center">
          <p className="mb-4">
            We partner with trusted global freight carriers to ensure timely, secure delivery — including DHL, TNT, FedEx, and Toll.
          </p>
          <p className="text-sm text-muted-foreground">
            Our logistics team will determine the optimal carrier based on your specific shipping requirements.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleClose} className="w-full">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
