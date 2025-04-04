import type { Metadata } from "next";
// import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "OmniLedger | All-in-One E-commerce & ERP SaaS Platform",
  description:
    "Streamline your business with OmniLedger's integrated e-commerce and ERP solution. Customizable storefronts, multi-tenant admin panels, automated accounting, and real-time synced apps.",
  keywords:
    "OmniLedger, E-commerce, ERP, SaaS, multi-tenant, accounting, inventory management, customizable storefronts",

  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
    // </ClerkProvider>
  );
}
