import { trpcClient } from "@/trpc/clients/client";
import { FeedbackType } from "@prisma/client";
import { LucideIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface IReactionButtonProps {
  Icon: LucideIcon;
  type: FeedbackType;
  articleId: number;
  selected?: boolean;
}

const ReactionButton = ({
  Icon,
  articleId,
  type,
  selected,
}: IReactionButtonProps) => {
  const utils = trpcClient.useUtils();

  const { mutateAsync: giveFeedback } =
    trpcClient.feedbacks.giveMyFeedback.useMutation({
      onSuccess: () => {
        utils.feedbacks.myFeedback.invalidate();
        utils.articles.userRecommendations.invalidate();
      },
    });
  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      onClick={async () => {
        await giveFeedback({
          articleId,
          type,
        });
      }}
      className={cn(
        "transition-all rounded-full",
        selected ? "shadow-lg border border-black scale-110" : "",
      )}
    >
      <Icon />
    </Button>
  );
};

export default ReactionButton;
