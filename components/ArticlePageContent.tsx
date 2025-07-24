"use client";

import { RouterOutputs } from "@/trpc/clients/types";
import { EditorContent, EditorRoot } from "novel";
import React from "react";
import { defaultExtensions } from "../app/(reporter)/reporter/my-articles/_components/Editor/extensions";
import { Title } from "@/components/Typography";
import DisplayDate from "@/components/DisplayDate";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import MoreLikeThis from "@/app/articles/[articleId]/_components/MoreLikeThis";

export interface IArticleCardSimpleProps {
  article: RouterOutputs["reporters"]["myArticles"][0];
  showRelatedArticles?: boolean;
}

const ArticlePageContent = ({
  article,
  showRelatedArticles,
}: IArticleCardSimpleProps) => {
  const articleJson = JSON.parse(article.body);

  return (
    <section className="max-w-5xl mx-auto">
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
      {showRelatedArticles && <MoreLikeThis id={article.id} />}
    </section>
  );
};

export default ArticlePageContent;
