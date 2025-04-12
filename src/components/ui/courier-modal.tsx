"use client";

import * as React from "react";
import { useEffect, useState } from "react";
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

const couriers = [
  {
    id: "fedex",
    name: "FedEx",
    image: "https://logos-world.net/wp-content/uploads/2020/04/FedEx-Logo-700x394.png",
    description: "Global leader in shipping and logistics"
  },
  {
    id: "dhl",
    name: "DHL",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/DHL.svg/640px-DHL.svg.png",
    description: "International shipping and logistics provider"
  },
  {
    id: "auspost",
    name: "Australia Post",
    image: "https://seeklogo.com/images/A/australia-post-logo-E13A328362-seeklogo.com.png",
    description: "Australia's primary postal service"
  },
  {
    id: "ups",
    name: "UPS",
    image: "https://www.ups.com/assets/resources/images/UPS_logo.svg",
    description: "Global package delivery and supply chain management"
  }
];

export function CourierModal({ isOpen, onClose }: CourierModalProps) {
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);

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

  const handleSelect = (courierId: string) => {
    setSelectedCourier(courierId);
  };

  const handleConfirm = () => {
    onClose();
  };

  // Ensure we only render the modal client-side and when isOpen is true
  if (typeof window === 'undefined' || !isOpen) {
    // Server-side or modal not open, render nothing
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => isOpen && handleClose()}>
      <DialogContent className="sm:max-w-md dark:border-gray-700 dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100">Select Shipping Partner</DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            Your order will be processed through one of our trusted partners.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            {couriers.map((courier) => (
              <div
                key={courier.id}
                className={`rounded-lg border p-4 cursor-pointer transition-colors
                            dark:border-gray-700
                            ${selectedCourier === courier.id
                               ? 'border-primary bg-primary/5 dark:bg-primary/10'
                               : 'dark:hover:border-gray-600 hover:border-gray-300'}`}
                onClick={() => handleSelect(courier.id)}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="relative w-24 h-12 bg-white dark:bg-gray-900 rounded flex items-center justify-center p-2">
                    <img
                      src={courier.image}
                      alt={courier.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium dark:text-gray-200">{courier.name}</h3>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">{courier.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button variant="outline" onClick={onClose} className="dark:border-gray-600 dark:hover:bg-gray-700">
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedCourier}
            >
              Confirm Selection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
