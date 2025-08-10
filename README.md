This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## SEO Features

This project includes comprehensive SEO optimizations:

### ✅ Implemented SEO Features

- **Meta Tags**: Comprehensive metadata in `layout.tsx` including title templates, descriptions, keywords
- **Open Graph**: Complete OG tags for social media sharing
- **Twitter Cards**: Optimized Twitter sharing cards
- **Structured Data**: JSON-LD schemas for better search engine understanding
- **Robots.txt**: Dynamic robots.txt generation via `app/robots.ts`
- **Sitemap**: Dynamic XML sitemap generation via `app/sitemap.ts`
- **Web Manifest**: PWA manifest for app-like experience
- **Canonical URLs**: Proper canonical URL structure
- **Image Optimization**: WebP/AVIF support and responsive images
- **Google Analytics**: Ready-to-use GA4 integration
- **Security Headers**: Security and performance headers in Next.js config

### 🚀 SEO Configuration

1. **Environment Variables**: Copy `.env.example` to `.env.local` and configure:
   ```bash
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   GOOGLE_SITE_VERIFICATION=your_verification_code
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

2. **Images**: Add these SEO images to `/public/`:
   - `og-image.png` (1200x630) - Default Open Graph image
   - `twitter-image.png` (1200x630) - Twitter card image
   - `og-home.png` - Home page specific OG image
   - `og-pricing.png` - Pricing page specific OG image
   - `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180)
   - `android-chrome-192x192.png`, `android-chrome-512x512.png`

3. **Google Search Console**: Verify your domain and submit sitemaps
4. **Social Media**: Update social media handles in metadata

### 📊 SEO Utils

Use the SEO utility functions in `src/lib/seo.ts`:

```typescript
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Your Page Title",
  description: "Your page description",
  keywords: ["keyword1", "keyword2"],
  url: "/your-page",
});
```

### 📈 Performance Optimizations

- Font optimization with `display: swap`
- Image optimization with WebP/AVIF formats
- Compression enabled
- Security headers configured
- Bundle optimization for Radix UI components

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
