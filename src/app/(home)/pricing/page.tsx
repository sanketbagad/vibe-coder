"use client";

import { PricingTable } from "@clerk/nextjs";
import Image from "next/image";
import { dark } from "@clerk/themes";
import { useCurrentTheme } from "@/hooks/use-current-theme";

export default function Page() {
  const theme = useCurrentTheme();
  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className="flex flex-col items-center">
            <Image
              src="/bot.svg"
              alt="Botbyte"
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
  );
}
