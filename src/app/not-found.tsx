import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - Botbyte Builder",
  description: "The page you're looking for doesn't exist. Return to Botbyte Builder to continue creating amazing websites with AI.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
        </div>
        
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
          >
            Return Home
          </Link>
          
          <div className="text-sm text-muted-foreground">
            <Link 
              href="/pricing" 
              className="underline hover:no-underline"
            >
              View Pricing
            </Link>
            {" · "}
            <Link 
              href="/sign-in" 
              className="underline hover:no-underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
