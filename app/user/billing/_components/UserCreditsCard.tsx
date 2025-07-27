import { Skeleton } from "@/components/ui/skeleton";
import { Coins } from "lucide-react";
import React from "react";

const UserCreditsCard = ({
  userCredits,
  isLoading,
}: {
  userCredits: number;
  isLoading?: boolean;
}) => {
  return (
    <div className="w-full p-4 border rounded-xl bg-gradient-to-br from-muted to-background shadow-lg relative overflow-hidden">
      <h1 className="font-semibold text-sm sm:text-base md:text-lg">
        Available Credits
      </h1>
      {isLoading ? (
        <Skeleton className="h-10 w-32" />
      ) : (
        <p className="font-bold text-xl sm:text-2xl md:text-3xl">
          {userCredits}
        </p>
      )}
      <p className="text-sm text-muted-foreground mt-3">
        When your credits reaches zero, your AI services will stop working.
      </p>
      <Coins className="text-muted-foreground opacity-30 absolute -top-4 right-0 h-28 w-28" />
    </div>
  );
};

export default UserCreditsCard;
