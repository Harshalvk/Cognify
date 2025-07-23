"use client";

import React from "react";
import AlertBox from "@/components/AlertBox";
import { AlertTriangle, Newspaper } from "lucide-react";
import { trpcClient } from "@/trpc/clients/client";
import ArticleCard from "./_components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";

const MyArticlesPage = () => {
  const { data: myArticles, isLoading } =
    trpcClient.reporters.myArticles.useQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-3">
        <Skeleton className="w-full h-40 rounded-xl" />
        <Skeleton className="w-full h-40 rounded-xl" />
        <Skeleton className="w-full h-40 rounded-xl" />
      </div>
    );
  }

  if (myArticles === undefined) {
    return (
      <AlertBox
        text="No Articles"
        icon={AlertTriangle}
        description="There are no articles yet please create one."
      >
        <div className="w-full flex items-center justify-center">
          <p className="bg-background rounded-full p-3">
            <Newspaper className="h-7 w-7 text-primary" />
          </p>
        </div>
      </AlertBox>
    );
  }
  return (
    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {myArticles.map((article) => (
        <div key={article.id}>
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  );
};

export default MyArticlesPage;
