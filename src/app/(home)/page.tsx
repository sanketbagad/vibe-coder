import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Website Builder - Create Stunning Websites in Minutes",
  description: "Build professional websites effortlessly with Botbyte AI. Our intelligent website builder creates responsive, modern websites from your ideas. No coding skills required. Start building today!",
  keywords: ["AI website builder", "create website", "no code website", "website generator", "responsive design", "professional websites"],
  openGraph: {
    title: "AI Website Builder - Create Stunning Websites in Minutes",
    description: "Build professional websites effortlessly with Botbyte AI. No coding skills required.",
    images: ["/og-home.png"],
  },
  twitter: {
    title: "AI Website Builder - Create Stunning Websites in Minutes",
    description: "Build professional websites effortlessly with Botbyte AI. No coding skills required.",
    images: ["/twitter-home.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Botbyte Builder",
    "description": "AI-powered website builder that creates professional websites in minutes",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://botbyte.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "category": "SaaS",
      "availability": "https://schema.org/InStock"
    },
    "creator": {
      "@type": "Organization",
      "name": "Botbyte",
      "url": process.env.NEXT_PUBLIC_APP_URL || "https://botbyte.com"
    },
    "featureList": [
      "AI-powered website generation",
      "Responsive design",
      "No coding required",
      "Professional templates",
      "Fast deployment"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col max-w-5xl mx-auto w-full">
        <section className="space-y-6 py-[16vh] 2xl:py-48">
          <div className="flex flex-col items-center">
            <Image
              src="/bot.svg"
              alt="Botbyte AI Website Builder Logo"
              width={50}
              height={50}
              className="hidden md:block"
              priority
            />
          </div>
          <h1 className="text-2xl md:text-5xl font-bold text-center">
            Build With Botbyte AI
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Now Build Cool Websites in Minutes
          </p>
          <div className="max-w-3xl mx-auto w-full">
            <ProjectForm />
          </div>
        </section>
        <ProjectsList />
      </div>
    </>
  );
}
