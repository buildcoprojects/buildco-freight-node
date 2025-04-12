"use client";

import { useEffect } from "react";

export default function LiveChat() {
  useEffect(() => {
    // Load Tawk.to chat widget
    const loadTawkTo = () => {
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = "https://embed.tawk.to/your-tawk-to-id/default"; // Replace with actual Tawk.to ID in production
      s1.setAttribute("crossorigin", "*");

      const s0 = document.getElementsByTagName("script")[0];
      if (s0?.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      } else {
        document.head.appendChild(s1);
      }

      // Define the Tawk_API
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
    };

    // Load the chat widget
    loadTawkTo();

    // Cleanup function
    return () => {
      // Remove the widget if component unmounts
      if (window.Tawk_API?.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}

// Add TypeScript type definition for Tawk.to
declare global {
  interface Window {
    Tawk_API?: {
      hideWidget?: () => void;
      showWidget?: () => void;
      toggle?: () => void;
      onLoad?: () => void;
      onStatusChange?: (status: string) => void;
    };
    Tawk_LoadStart?: Date;
  }
}
