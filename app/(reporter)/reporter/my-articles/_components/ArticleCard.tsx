import { RouterOutputs } from "@/trpc/clients/types";
import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DisplayDate from "@/components/DisplayDate";
import Link from "next/link";

export interface IArticleCardSimpleProps {
  article: RouterOutputs["reporters"]["myArticles"][0];
}

const ArticleCard = ({ article }: IArticleCardSimpleProps) => {
  return (
    <Link href={`/reporter/my-articles/${article.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
        </CardHeader>
        <CardFooter>
          <DisplayDate dateString={article.createdAt} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArticleCard;
