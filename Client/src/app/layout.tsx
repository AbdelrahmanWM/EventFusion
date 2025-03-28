import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ModeToggle from "./components/ModeToggle";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed bottom-5 left-16">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
