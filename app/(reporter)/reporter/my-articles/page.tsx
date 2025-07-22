"use client";

import React from "react";
import AlertBox from "@/components/AlertBox";
import { AlertTriangle, Newspaper } from "lucide-react";
import { trpcClient } from "@/trpc/clients/client";
import ArticleCard from "./_components/ArticleCard";

const MyArticlesPage = () => {
  const { data: myArticles } = trpcClient.reporters.myArticles.useQuery();

  if (!myArticles) {
    return <p>no articles</p>;
  }

  if (!myArticles.length) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {myArticles.map((article) => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </div>
  );
};

export default MyArticlesPage;
