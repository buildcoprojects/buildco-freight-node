import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import LiveChat from "@/components/LiveChat";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider"; // Updated import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Build Co Freight Node | Strategic Freight Forwarding via Australia",
  description: "Route high-value Chinese goods into the U.S. without triggering tariffs. Our controlled logistics corridor provides compliant freight forwarding at U.S.-cleared cost.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Set dark mode as default
          enableSystem={false} // Disable system theme
          storageKey="buildco-freight-theme" // Set storage key for localStorage persistence
        >
          {children}
          <Toaster />
          <SonnerToaster position="top-right" />
          <LiveChat />

          {/* Google Analytics */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GA_MEASUREMENT_ID}');
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}
