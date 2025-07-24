"use client";

import React, { useState } from "react";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorInstance,
  EditorRoot,
} from "novel";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash";
import { useDebounceCallback } from "usehooks-ts";
import { trpcClient } from "@/trpc/clients/client";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TagInput from "@/components/Tags";
import { toast } from "sonner";

const EditorPage = () => {
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [articleId, setArticleId] = useState<number | null>(null);

  const { mutateAsync: createArticle, isPending: isArticleCreationPending } =
    trpcClient.articles.create.useMutation({
      onSuccess: (data) => {
        toast.success(`Article created. ${title}`);
        setArticleId(data.id);
      },
    });

  const { mutateAsync: updateArticle, isPending: isArticleUpdatingPending } =
    trpcClient.articles.update.useMutation();

  const debouncedUpdates = useDebounceCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      if (!articleId) {
        const data = await createArticle({
          title,
          body: JSON.stringify(json),
          published,
          tags,
        });
        setArticleId(data.id);
        console.log("Created new article");
      } else {
        await updateArticle({
          articleId,
          articleData: {
            title,
            body: JSON.stringify(json),
            published,
            tags,
          },
        });
        console.log("Updated existing article");
      }
    },
    500,
  );

  const debouncedSetTitle = useDebounceCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    500,
  );

  return (
    <section>
      {isArticleCreationPending || isArticleUpdatingPending ? (
        <p>Saving...</p>
      ) : (
        <p>Saved</p>
      )}
      <div className="py-5 px-11 w-full space-y-4">
        <div className="flex w-full justify-between">
          <input
            placeholder="Article Title..."
            className="font-sans focus:outline-none font-semibold text-xl sm:text-3xl placeholder-muted-foreground w-full"
            onChange={(e) => {
              debouncedSetTitle(e);
            }}
          />
          <div>
            <Label htmlFor="publish-switch">Publish</Label>
            <Switch
              id="publish-switch"
              checked={published}
              onCheckedChange={setPublished}
            />
          </div>
        </div>
        <TagInput value={tags} onChange={setTags} />
      </div>
      <EditorRoot>
        <EditorContent
          extensions={[...defaultExtensions, slashCommand]}
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
