"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MessagesContainer } from "../components/messages-container";
import { Suspense, useState } from "react";
import { Fragment } from "@/generated/prisma";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeIcon, CrownIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CodeView } from "@/components/code-view";
import { FileExplorer } from "@/components/file-explorer";
import { UserControl } from "@/components/user-control";
import { useAuth } from "@clerk/nextjs";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "@/components/ui/loader";

interface ProjectViewProps {
  projectId: string;
}

export const ProjectView = ({ projectId }: ProjectViewProps) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<"preview" | "code">("preview");
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: "pro" });
  const trpc = useTRPC();
  
  // Get messages to determine loading state
  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({ projectId })
  );
  
  // Check if we should show the loader
  const lastMessage = messages[messages.length - 1];
  const isGenerating = lastMessage?.role === "USER";
  
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <ErrorBoundary fallback={<div>Something went wrong while loading the project header.</div>}>
          <Suspense fallback={<div>Loading project header...</div>}>
            <ProjectHeader projectId={projectId} />
          </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<div>Something went wrong while loading the project header.</div>}>
          <Suspense fallback={<div>Loading messages...</div>}>
            <MessagesContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
          </ErrorBoundary>
        </ResizablePanel>
        <ResizableHandle className="hover:bg-primary transition-colors" />
        <ResizablePanel defaultSize={65} minSize={20}>
          <Tabs
            value={tabState}
            defaultValue="preview"
            className="h-full gap-y-0"
            onValueChange={(value) => setTabState(value as "preview" | "code")}
          >
            <div className="w-full items-center flex p-2 border-b gap-x-2">
              <TabsList className="h-8 p-0 border rounded-md">
                <TabsTrigger value="preview" className="rounded-md">
                  <EyeIcon /> <span>Preview</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="rounded-md">
                  <CodeIcon /> <span>Code</span>
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-x-2">
                {!hasProAccess && (
                  <Button asChild variant="tertiary" size="sm">
                    <Link href={"/pricing"}>
                      <CrownIcon /> <span>Upgrade</span>
                    </Link>
                  </Button>
                )}
                <UserControl />
              </div>
            </div>
            <TabsContent value="preview">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center gap-4">
                    <Loader />
                    <p className="text-muted-foreground text-sm mt-5">Generating your project...</p>
                  </div>
                </div>
              ) : !!activeFragment ? (
                <FragmentWeb data={activeFragment} />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No preview available
                </div>
              )}
            </TabsContent>
            <TabsContent value="code" className="min-h-0">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center gap-4">
                    <Loader />
                    <p className="text-muted-foreground text-sm">Generating code...</p>
                  </div>
                </div>
              ) : !!activeFragment?.files ? (
                <FileExplorer
                  files={activeFragment.files as Record<string, string>}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No code available
                </div>
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
