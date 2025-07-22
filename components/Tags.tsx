"use client";

import { useState } from "react";
import { X } from "lucide-react";
interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === "Tab") && inputValue.trim() !== "") {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="w-full border rounded-md p-2 flex flex-wrap gap-1 focus-within:ring-2 focus-within:ring-ring">
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-muted text-muted-foreground"
        >
          {tag}
          <button
            type="button"
            onClick={() => handleRemoveTag(tag)}
            className="hover:text-destructive"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter"
        className="flex-1 min-w-[100px] border-none outline-none focus:ring-0 text-sm"
      />
    </div>
  );
};

export default TagInput;
