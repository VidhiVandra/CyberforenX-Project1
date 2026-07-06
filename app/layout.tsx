import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingWhatsApp from "@/components/mostused/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Loom & Weave | Luxury Handcrafted Carpets & Rugs",
  description: "Discover premium, ethically sourced heritage rugs and contemporary carpets designed for elegant luxury living.",
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
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}