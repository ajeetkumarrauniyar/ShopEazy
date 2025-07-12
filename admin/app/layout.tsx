import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/themeProvider";
import AuthProvider from "@/providers/authProvider";

export const metadata: Metadata = {
  title: "OmniLedger | All-in-One E-commerce & ERP SaaS Platform",
  description:
    "Streamline your business with OmniLedger's integrated e-commerce and ERP solution. Customizable storefronts, multi-tenant admin panels, automated accounting, and real-time synced apps.",
  keywords:
    "OmniLedger, E-commerce, ERP, SaaS, multi-tenant, accounting, inventory management, customizable storefronts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
