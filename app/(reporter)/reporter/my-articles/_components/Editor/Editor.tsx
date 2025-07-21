"use client";

import React from "react";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorInstance,
  EditorRoot,
  JSONContent,
} from "novel";
import { useState } from "react";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash";
import { useDebounceCallback } from "usehooks-ts";

const EditorPage = () => {
  const [content, setContent] = useState<JSONContent | undefined>(undefined);

  const debouncedUpdates = useDebounceCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setContent(json);
    },
    500,
  );

  return (
    <section>
      <div className="py-5 px-11">
        <input
          placeholder="Article Title..."
          className="font-sans focus:outline-none font-semibold text-xl sm:text-3xl placeholder-muted-foreground"
        />
      </div>
      <EditorRoot>
        <EditorContent
          extensions={[...defaultExtensions, slashCommand]}
          initialContent={content}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
          }}
        >
          <EditorCommand
            className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all"
            spellCheck="false"
          >
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => {
                    if (item.command !== undefined) {
                      item.command(val);
                    }
                  }}
                  className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent`}
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </section>
  );
};

export default EditorPage;
