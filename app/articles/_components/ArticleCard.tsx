import DisplayDate from "@/components/DisplayDate";
import ReactionPanel from "@/app/articles/_components/ReactionPanel";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { RouterOutputs } from "@/trpc/clients/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
      <CardFooter className="flex justify-between items-end">
        <div>
          <DisplayDate
            dateString={article.createdAt}
            className="text-muted-foreground text-sm"
          />
          <div>
            <ReactionPanel articleId={article.id} />
            <p className="block text-xs">
              Current relevance {Math.floor(score * 100)}
            </p>
          </div>
        </div>

        <Link
          href={`/articles/${article.id}`}
          className={buttonVariants({
            variant: "outline",
            className: "group rounded-lg",
          })}
        >
          Read
          <ArrowRight className="-translate-x-0.5 group-hover:translate-x-0 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
