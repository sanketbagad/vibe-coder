import { TreeItem } from "@/types";

interface TreeViewProps {
  data: TreeItem[];
  onSelect: (filePath: string) => void;
  value: string;
}

export const TreeView = ({ data, onSelect, value }: TreeViewProps) => {
  // Implementation of the TreeView component
  // This would typically render the tree structure and handle selection
  return (
    <div>
      {/* Render tree items here */}
      {data.map((item, index) => (
        <div key={index} onClick={() => onSelect(item as string)}>
          {typeof item === "string" ? item : item[0]}
        </div>
      ))}
    </div>
  );
};
