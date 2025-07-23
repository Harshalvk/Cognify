import DisplayDate from "@/components/DisplayDate";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { RouterOutputs } from "@/trpc/clients/types";
import React from "react";

const ArticleCard = ({
  article,
  score,
}: {
  article: NonNullable<
    RouterOutputs["articles"]["userRecommendations"][0]["article"]
  >;
  score: NonNullable<
    RouterOutputs["articles"]["userRecommendations"][0]["score"]
  >;
}) => {
  return (
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
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col justify-start items-start">
        <DisplayDate
          dateString={article.createdAt}
          className="text-muted-foreground text-sm"
        />
        <p className="block text-xs">
          Current relevance {Math.floor(score * 100)}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
