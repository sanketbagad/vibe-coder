import { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateSEO({
  title,
  description,
  keywords = [],
  image = "/og-image.png",
  url = "",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://botbyte.com";
  const fullUrl = `${baseUrl}${url}`;
  const siteName = "Botbyte Builder";
  
  const defaultTitle = "Botbyte Builder - AI-Powered Website Builder";
  const defaultDescription = "Build stunning websites in minutes with Botbyte AI. Create professional, responsive websites using artificial intelligence. No coding required.";
  
  const seoTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  
  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords.length > 0 ? keywords : ["AI website builder", "no code", "website creator", "artificial intelligence"],
    authors: author ? [{ name: author }] : [{ name: "Botbyte Team" }],
    openGraph: {
      type,
      locale: "en_US",
      url: fullUrl,
      title: seoTitle,
      description: seoDescription,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [image],
      creator: "@botbyte",
    },
    alternates: {
      canonical: fullUrl,
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
  };

  return metadata;
}

// Common structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Botbyte",
  "url": process.env.NEXT_PUBLIC_APP_URL || "https://botbyte.com",
  "logo": {
    "@type": "ImageObject",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || "https://botbyte.com"}/logo.png`,
    "width": 200,
    "height": 200
  },
  "sameAs": [
    "https://twitter.com/botbyte",
    "https://github.com/botbyte",
    "https://linkedin.com/company/botbyte"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "contact@botbyte.com"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Botbyte Builder",
  "url": process.env.NEXT_PUBLIC_APP_URL || "https://botbyte.com",
  "description": "AI-powered website builder for creating professional websites",
  "publisher": organizationSchema,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${process.env.NEXT_PUBLIC_APP_URL || "https://botbyte.com"}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
