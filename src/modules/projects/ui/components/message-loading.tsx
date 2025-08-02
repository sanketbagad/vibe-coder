import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const ShimmerMessages = () => {
  const messages = [
    "Thinking...",
    "Generating response...",
    "Loading fragments...",
    "Fetching data...",
    "Analyzing input...",
    "Preparing response...",
    "Compiling information...",
    "Processing request...",
    "Retrieving data...",
    "Finalizing response...",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000); // Change message every two seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-base animate-pulse">
        {messages[currentMessageIndex]}
      </span>
    </div>
  );
};

export const MessageLoading = () => {
  return (
    <div className="flex flex-col group px-2 pb-4">
      <div className="flex items-center gap-2 pt-2 mb-2">
        <Image
          src="/bot.svg"
          alt="Vibing"
          width={18}
          height={18}
          className="shrink-0"
        />
        <span className="text-sm font-medium">Botbyte AI</span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <ShimmerMessages />
      </div>
    </div>
  );
};
