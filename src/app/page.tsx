'use client';
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";

export default function Home() {
  const trpc = useTRPC();

  
  return (
    <div className="font-bold text-3xl text-center my-10">
    <Button>
      Click Me
    </Button>
    </div>
  );
}
