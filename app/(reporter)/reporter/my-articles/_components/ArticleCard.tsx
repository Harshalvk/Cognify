import { RouterOutputs } from "@/trpc/clients/types";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DisplayDate from "@/components/DisplayDate";
import { Badge } from "@/components/ui/badge";
import ArticleOptions from "./ArticleOptions";

export interface IArticleCardSimpleProps {
  article: RouterOutputs["reporters"]["myArticles"][0];
}

const ArticleCard = ({ article }: IArticleCardSimpleProps) => {
  return (
    <div className="relative">
      <Card className="h-full justify-between">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">{article.title}</CardTitle>
          <CardDescription>
            <div className="flex gap-1">
              {article.tags.map((tag) => (
                <Badge className="rounded-full" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
            {article.published ? (
              <p className="mt-2">Published</p>
            ) : (
              <p className="mt-2">Unpublished</p>
            )}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <DisplayDate
            dateString={article.createdAt}
            className="text-muted-foreground text-sm"
          />
        </CardFooter>
        <ArticleOptions article={article} className="absolute right-1" />
      </Card>
    </div>
  );
};

export default ArticleCard;
