"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpcClient } from "@/trpc/clients/client";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PaymentSuccessModal = () => {
  const utils = trpcClient.useUtils();

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(true);

  const handleClick = () => {
    utils.creditBalance.myCreditBalance.invalidate();
    setOpenDialog(false);
    router.replace("/user/billing");
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <div className="w-full flex flex-col items-center">
          <BadgeCheck className="h-24 w-24 text-primary" />
          <h1 className="text-base sm:text-xl md:text-2xl">
            Payment Successful 🎉
          </h1>
        </div>
        <DialogTitle></DialogTitle>
        <DialogDescription>
          Your payment has been successfully processed. Now you can go and enjoy
          AI services.
        </DialogDescription>
        <DialogClose>
          <Button
            onClick={handleClick}
            className="w-full"
            variant={"secondary"}
          >
            Continue Reading
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessModal;
