import { TreeItem } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertFilesToTreeItems(files: {
  [path: string]: string;
}): TreeItem[] {
  interface TreeNode {
    [key: string]: TreeNode | null;
  }

  const tree: TreeNode = {};

  const sortedPaths = Object.keys(files).sort();

  for (const path of sortedPaths) {
    const parts = path.split("/");
    let currentNode: TreeNode = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        // This is a file (last part of the path)
        currentNode[part] = null;
      } else {
        // This is a directory
        if (!currentNode[part]) {
          currentNode[part] = {};
        }
        currentNode = currentNode[part] as TreeNode;
      }
    }
  }
  function buildTree(node: TreeNode): TreeItem[] {
    const children: TreeItem[] = [];
    for (const [key, value] of Object.entries(node)) {
      if (value === null) {
        children.push(key); // It's a file
      } else {
        const subTree = buildTree(value);
        children.push([key, ...subTree]);
      }
    }
    return children;
  }

  return buildTree(tree);
}
