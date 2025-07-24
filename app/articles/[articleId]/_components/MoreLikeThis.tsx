import { trpcClient } from "@/trpc/clients/client";
import { BaseComponent } from "@/util/types";
import React from "react";
import { Title2 } from "@/components/Typography";
import ArticleCardMoreLikeThis from "./ArticleCardMoreLikeThis";

const MoreLikeThis = ({ id, className }: BaseComponent & { id: number }) => {
  const { data } = trpcClient.articles.moreLikeThis.useQuery({ id });

  return (
    <div className={className}>
      <Title2>More like this</Title2>
      <div className="flex flex-col gap-6 mt-4">
        {data
          ?.filter((article) => article.article.id !== id)
          .map((article) => (
            <ArticleCardMoreLikeThis
              relatedArticle={article}
              key={article.article.id}
            />
          ))}
      </div>
    </div>
  );
};

export default MoreLikeThis;
