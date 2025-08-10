"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-destructive">Oops!</h1>
          <h2 className="text-2xl font-semibold">Something went wrong</h2>
        </div>
        
        <p className="text-muted-foreground">
          We encountered an unexpected error. Our team has been notified and is working to fix this.
        </p>
        
        <div className="space-y-4">
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
            >
              Try Again
            </button>
            
            <Link 
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
            >
              Return Home
            </Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Error ID: {error.digest && <code className="text-xs bg-muted px-1 rounded">{error.digest}</code>}
          </div>
        </div>
      </div>
    </div>
  );
}
