import type { Metadata } from "next";
// 1. Import Outfit instead of Plus_Jakarta_Sans
import { Outfit } from "next/font/google";
import "./globals.css";
import { DashboardProvider } from "@/context/DashboardContext";
import { ThemeProvider } from "@/components/ThemeProvider";

// 2. Configure the Outfit font
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "A clean and interactive finance dashboard interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      {/* 3. Apply the outfit variable to the body */}
      <body 
        className={`${outfit.variable} bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300`} 
        suppressHydrationWarning
      >
        <ThemeProvider>
          <DashboardProvider>
            {children}
          </DashboardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}