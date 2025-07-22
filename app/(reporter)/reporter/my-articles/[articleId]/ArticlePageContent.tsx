"use client";

import { RouterOutputs } from "@/trpc/clients/types";
import { EditorContent, EditorRoot } from "novel";
import React from "react";
import { defaultExtensions } from "../_components/Editor/extensions";

export interface IArticleCardSimpleProps {
  article: RouterOutputs["reporters"]["myArticles"][0];
}

const ArticlePageContent = ({ article }: IArticleCardSimpleProps) => {
  const articleJson = JSON.parse(article.body);

  return (
    <section>
      <EditorRoot>
        <EditorContent
          extensions={[...defaultExtensions]}
          editable={false}
          initialContent={articleJson}
        />
      </EditorRoot>
    </section>
  );
};

export default ArticlePageContent;
