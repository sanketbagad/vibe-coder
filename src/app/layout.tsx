import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Botbyte Builder - AI-Powered Website Builder by Sanket Bagad",
    template: "%s | Botbyte Builder"
  },
  description: "Build stunning websites in minutes with Botbyte AI. Create professional, responsive websites using artificial intelligence. No coding required - just describe your vision and watch it come to life.",
  keywords: ["AI website builder", "sanket bagad", "website creator", "no code", "artificial intelligence", "web design", "responsive websites", "Botbyte"],
  authors: [{ name: "Sanket Bagad", url: "https://twitter.com/sarcastic_sb" }],
  creator: "Sanket Bagad",
  publisher: "Sanket Bagad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://botbyte.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Botbyte Builder - AI-Powered Website Builder",
    description: "Build stunning websites in minutes with Botbyte AI. Create professional, responsive websites using artificial intelligence.",
    siteName: "Botbyte Builder",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Botbyte Builder - AI Website Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Botbyte Builder - AI-Powered Website Builder",
    description: "Build stunning websites in minutes with Botbyte AI. No coding required.",
    images: ["/og-image.png"],
    creator: "@sarcastic_sb",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      me: ["mailto:hello@botbyte.in"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      variables: {
        colorPrimary: "oklch(0.3485 0 0)",
      },
    }}
    >
      <TRPCReactProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL || "https://botbyte.com"} />
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""} />
              <Toaster />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
