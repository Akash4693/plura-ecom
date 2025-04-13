import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import DndContextProvider from "./providers/DndContextProvideder";
import RouteLoadingIndicator from "@/components/skeleton/RouteLoading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plura",
  description: "All in one digital marketplace",
  icons: {
    icon: "/plura-logo.svg", 
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <Providers>
            <DndContextProvider>
            <RouteLoadingIndicator />
              <Navbar />
              <main>{children}</main>
              <Toaster />
            </DndContextProvider>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
