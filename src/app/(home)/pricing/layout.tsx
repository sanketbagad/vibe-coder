import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans - Botbyte Builder",
  description: "Choose the perfect plan for your AI website building needs. Flexible pricing for individuals, teams, and enterprises. Start building professional websites with Botbyte AI today.",
  keywords: ["pricing", "plans", "AI website builder cost", "website builder pricing", "subscription", "botbyte pricing"],
  openGraph: {
    title: "Pricing Plans - Botbyte Builder",
    description: "Choose the perfect plan for your AI website building needs. Flexible pricing for all users.",
    images: ["/og-pricing.png"],
  },
  twitter: {
    title: "Pricing Plans - Botbyte Builder",
    description: "Choose the perfect plan for your AI website building needs. Flexible pricing for all users.",
    images: ["/og-pricing.png"],
  },
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
