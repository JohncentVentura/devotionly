import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { stackClientApp } from "@/stack/client";
import { StackProvider, StackTheme } from "@stackframe/stack";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devotionly",
  description:
    "A digital devotion app for writing, organizing, and tracking on personal bible devotions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              disableTransitionOnChange
              enableSystem
            >
              <Toaster />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </ThemeProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
