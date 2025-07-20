"use client";

import { Check, Copy } from "lucide-react";
import React, { useEffect, useState } from "react";

const CopyToClipboard = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  useEffect(() => {
    const removeCopy = setTimeout(() => {
      setIsCopied(false);
    }, 1000);

    return () => {
      clearTimeout(removeCopy);
    };
  }, [isCopied]);

  return (
    <div className="flex items-center justify-between border rounded px-2 py-1 text-sm">
      <span className="font-mono">{text}</span>
      <button
        onClick={handleCopyClick}
        className="text-muted-foreground hover:text-primary transition-colors ml-2 cursor-pointer"
      >
        {isCopied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

export default CopyToClipboard;
