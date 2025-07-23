"use client";

import { RouterOutputs } from "@/trpc/clients/types";
import { EditorContent, EditorRoot } from "novel";
import React from "react";
import { defaultExtensions } from "../_components/Editor/extensions";
import { Title } from "@/components/Typography";
import DisplayDate from "@/components/DisplayDate";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export interface IArticleCardSimpleProps {
  article: RouterOutputs["reporters"]["myArticles"][0];
}

const ArticlePageContent = ({ article }: IArticleCardSimpleProps) => {
  const articleJson = JSON.parse(article.body);

  return (
    <section>
      <div className="p-11">
        <Title className="sm:text-2xl md:text-3xl">{article.title}</Title>
        <DisplayDate
          className="text-muted-foreground text-sm"
          dateString={article.createdAt}
        />
        {article.tags.length !== 0 && (
          <div className="flex gap-1 mt-2">
            {article.tags.map((tag) => (
              <Badge key={tag} className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {article.published ? "Published" : "Unpublished"}
      </div>
      <div className="px-11">
        <Separator />
      </div>
      <EditorRoot>
        <EditorContent
          className="p-0"
          extensions={[...defaultExtensions]}
          editable={false}
          initialContent={articleJson}
        />
      </EditorRoot>
    </section>
  );
};

export default ArticlePageContent;
