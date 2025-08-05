import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState, useMemo, useCallback, Fragment } from "react";
import { Hint } from "./hints";
import { Button } from "@/components/ui/button";
import { CodeView } from "./code-view";
import { ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { convertFilesToTreeItems } from "@/lib/utils";
import { TreeView } from "./tree-view";

type FileCollection = { [path: string]: string };

function getLanguageFromExtension(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension || "text";
}

interface FileExplorerProps {
  files: FileCollection;
}

export const FileExplorer = (props: FileExplorerProps) => {
  const { files } = props;

  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const fileKeys = Object.keys(files);
    return fileKeys.length > 0 ? fileKeys[0] : null;
  });

  const treeData = useMemo(() => {
    return convertFilesToTreeItems(files);
  }, [files]);

  const handleFileSelect = useCallback((filePath: string) => {
    if (files[filePath]) {
      setSelectedFile(filePath);
    }
  }, [files]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={30} className="bg-sidebar">
       <TreeView
        data={treeData}
        onSelect={handleFileSelect}
        value={selectedFile || ""}
       />
      </ResizablePanel>
      <ResizablePanel className="hover:bg-primary transition-colors" />
      <ResizablePanel defaultSize={70} minSize={30} className="bg-background">
        {selectedFile && files[selectedFile] ? (
          <div className="h-full w-full flex flex-col">
            <div className="border=b bg-sidebar py-4 flex justify-between items-center px-4 gap-x-2">
              <Hint text="Copy file path" side="bottom" align="start">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedFile || "");
                  }}
                  disabled={!selectedFile}
                >
                  <CopyIcon />
                </Button>
              </Hint>
            </div>
            <div className="flex-1 overflow-auto">
              <CodeView
                code={files[selectedFile]}
                lang={getLanguageFromExtension(selectedFile)}
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No file selected
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
