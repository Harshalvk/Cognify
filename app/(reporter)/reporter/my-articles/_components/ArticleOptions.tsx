"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouterOutputs } from "@/trpc/clients/types";
import { trpcClient } from "@/trpc/clients/client";
import { toast } from "sonner";

interface ArticleOptionsProps extends React.HTMLAttributes<HTMLDivElement> {
  article: RouterOutputs["reporters"]["myArticles"][0];
}

const ArticleOptions = ({
  className,
  article,
  ...props
}: ArticleOptionsProps) => {
  const { mutateAsync: updateArticle } = trpcClient.articles.update.useMutation(
    {
      onSuccess: () => {
        toast.success("Article unpublished", { id: "updating-article-status" });
      },
      onMutate: () => {
        toast.loading("Unpublishing article", {
          id: "updating-article-status",
        });
      },
      onError: () => {
        toast.error("Something went wrong", { id: "updating-article-status" });
      },
    },
  );

  return (
    <div className={className} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              updateArticle({
                articleId: article.id,
                articleData: {
                  body: article.body,
                  tags: article.tags,
                  title: article.title,
                  published: !article.published,
                },
              });
            }}
          >
            <Archive />
            {article.published ? "Unpublish" : "Publish"}
            <h1>{article.published}</h1>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-400">
            <Trash2 className="text-red-400" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ArticleOptions;
