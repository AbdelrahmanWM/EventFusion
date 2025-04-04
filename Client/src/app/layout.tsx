import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import ModeToggle from "../components/ui/ModeToggle";
import { ThemeProvider } from "./_app";
import { ServicesClientContextProvider } from "@/contexts/ServicesClientContext";
import Header from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Education Events System (SEES)",
  description:
    "A cutting-edge platform for organizing, managing, and engaging with educational events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ServicesClientContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
    <div className='flex flex-col min-h-screen transition-all`'>
          <Header/>
          {children}
          <Footer/>
          </div>
          <div className="fixed bottom-5 left-16">
            <ModeToggle />
          </div>
        </ThemeProvider>
        </ServicesClientContextProvider>
      </body>
    </html>
  );
}
