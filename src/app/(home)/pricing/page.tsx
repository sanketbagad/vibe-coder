"use client";

import { PricingTable } from "@clerk/nextjs";
import Image from "next/image";
import { dark } from "@clerk/themes";
import { useCurrentTheme } from "@/hooks/use-current-theme";
import { Metadata } from "next";

// Note: Since this is a client component, we'll need to move metadata to a server component wrapper
// For now, we'll add it to the parent layout or create a separate metadata file

export default function Page() {
  const theme = useCurrentTheme();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "Botbyte Builder Pricing Plans",
    "description": "Choose from our flexible pricing plans for AI website building",
    "seller": {
      "@type": "Organization",
      "name": "Botbyte",
      "url": process.env.NEXT_PUBLIC_APP_URL || "https://botbyte.com"
    },
    "category": "SaaS",
    "availability": "https://schema.org/InStock"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col max-w-3xl mx-auto w-full">
        <section className="space-y-6 pt-[16vh] 2xl:pt-48">
          <div className="flex flex-col items-center">
              <Image
                src="/bot.svg"
                alt="Botbyte AI Website Builder"
                width={50}
                height={50}
                className="hidden md:block"
              />
          </div>
          <h1 className="text-3xl font-bold text-center">
            Choose Your Plan
          </h1>
          <p className="text-center text-muted-foreground">
            Select a plan that suits your needs. All plans include access to Botbyte AI, unlimited projects, and more.
          </p>
          <PricingTable
            appearance={{
              elements: {
                pricingTableCard: "border! shadow-none! rounded-lg!",
                headerTitle: "text-2xl font-semibold",
                headerSubtitle: "text-lg text-muted-foreground",
                buttonPrimary: "bg-primary text-white hover:bg-primary/90",
              },
              baseTheme: theme === "dark" ? dark : undefined,
            }}
          />
        </section>
      </div>
    </>
  );
}
