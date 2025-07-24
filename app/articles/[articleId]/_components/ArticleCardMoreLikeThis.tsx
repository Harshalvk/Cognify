import { cn } from "@/lib/utils";
import { RouterOutputs } from "@/trpc/clients/types";
import Link from "next/link";
import React from "react";

const ArticleCardMoreLikeThis = ({
  relatedArticle,
}: {
  relatedArticle: NonNullable<RouterOutputs["articles"]["moreLikeThis"][0]>;
}) => {
  const { article, score } = relatedArticle;
  return (
    <div>
      <div>{Math.floor(score * 100)}% Match</div>

      <Link href={`/articles/${article.id}`}>
        <div
          className={cn(
            "text-lg font-medium hover:underline line-clamp-2 max-w-lg underline-offset-4",
          )}
        >
          {article.title}
        </div>
      </Link>
    </div>
  );
};

export default ArticleCardMoreLikeThis;
