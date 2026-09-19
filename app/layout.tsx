import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#05070A" },
  ],
};

export const metadata: Metadata = {
  title: "BluePeak Web Co. | Premium Web Design & Development Studio",
  description:
    "We design and develop modern, high-performance websites, e-commerce stores, and custom web applications tailored to your business goals and audience.",
  keywords: [
    "web design agency",
    "custom web development",
    "Next.js web applications",
    "e-commerce development",
    "UI/UX design studio",
    "BluePeak Web Co",
  ],
  authors: [{ name: "BluePeak Web Co." }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              position: "relative",
            }}
          >
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
