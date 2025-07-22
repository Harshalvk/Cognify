import { trpcServer } from "@/trpc/clients/server";
import React from "react";
import ArticlePageContent from "./ArticlePageContent";

const ArticlePage = async ({ params }: { params: { articleId: string } }) => {
  const article = await trpcServer.articles.getArticleById.mutate({
    articleId: Number(params.articleId),
  });

  if (!article) {
    return <p>article not found</p>;
  }

  return <ArticlePageContent article={article} />;
};

export default ArticlePage;
