import ArticlePageContent from "@/components/ArticlePageContent";
import { trpcServer } from "@/trpc/clients/server";
import React from "react";

const ArticlePage = async ({ params }: { params: { articleId: string } }) => {
  const article = await trpcServer.articles.getArticleById.mutate({
    articleId: Number(params.articleId),
  });

  if (!article) {
    return <p>article not found</p>;
  }

  return <ArticlePageContent article={article} showRelatedArticles={true} />;
};

export default ArticlePage;
