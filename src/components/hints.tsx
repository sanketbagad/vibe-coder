"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HintsProps {
  children: React.ReactNode;
  text: string;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
}

export const Hint = ({
  children,
  text,
  side = "top",
  align = "center",
}: HintsProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
