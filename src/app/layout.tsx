import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "RK MOBILES - Mobile Sales & Service | Dharapuram",
    template: "%s | RK MOBILES",
  },
  description:
    "RK MOBILES - Your local destination for mobile phones, professional mobile repair services, accessories and everyday digital services. Located at Pollachi Road, Dharapuram.",
  keywords: [
    "mobile shop",
    "mobile repair",
    "mobile service",
    "mobile accessories",
    "phone shop",
    "display replacement",
    "battery replacement",
    "mobile repair Dharapuram",
    "mobile shop Dharapuram",
    "RK MOBILES",
  ],
  openGraph: {
    title: "RK MOBILES - Mobile Sales & Service | Dharapuram",
    description:
      "Your local destination for mobile phones, professional mobile repair services, accessories and everyday digital services.",
    type: "website",
    locale: "en_IN",
    siteName: "RK MOBILES",
    images: [{ url: "/logo.png", width: 339, height: 419, alt: "RK MOBILES" }],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e1b4b",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#DC2626",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
