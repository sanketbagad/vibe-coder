"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export const ProjectsList = () => {
  const trpc = useTRPC();
  const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {user?.firstName}&apos;s Bytes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3  gap-6">
        {projects?.length === 0 && (
          <div className="col-span-3 text-center text-gray-500">
            No projects found.
          </div>
        )}
        {projects?.map((project) => (
          <Button
            key={project.id}
            variant="outline"
            className="w-full justify-start font-normal text-start p-4 h-auto"
            asChild
          >
            <Link href={`/projects/${project.id}`}>
              <div className="flex items-center gap-x-4">
                <Image
                  src="/bot.svg"
                  alt="Botbyte Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <div className="flex flex-col">
                  <h3 className="truncate font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(project.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
