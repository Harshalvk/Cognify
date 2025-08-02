"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { trpcClient } from "@/trpc/clients/client";
import React, { useEffect } from "react";
import { toast } from "sonner";
import ArticleCard from "./_components/ArticleCard";

const ArticlesPage = () => {
  const {
    data: articles,
    isLoading,
    error,
  } = trpcClient.articles.userRecommendations.useQuery();

  useEffect(() => {
    if (error) {
      toast.error(error.data?.code);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-3 gap-3">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-3 gap-3">
      {articles?.map(({ article, score }) => (
        <ArticleCard article={article} key={article.id} score={score} />
      ))}
    </div>
  );
};

export default ArticlesPage;
