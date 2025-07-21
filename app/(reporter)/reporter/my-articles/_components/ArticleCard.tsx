import { RouterOutputs } from "@/trpc/clients/types";
import React from "react";

export interface IArticleCardSimpleProps {
  article: RouterOutputs["reporters"]["findAll"][0];
}

const ArticleCard = ({ article }: IArticleCardSimpleProps) => {
  return <div>{article.User.name}</div>;
};

export default ArticleCard;
