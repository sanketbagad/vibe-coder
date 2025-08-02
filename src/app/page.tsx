"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectView } from "@/modules/projects/ui/views/project-view";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  return (
    <div className="text-lg text-gray-500 my-4">
      <ProjectView projectId="a6d63210-d2f9-46b5-9ca5-719232bdf4e5" />
    </div>
  );
}
