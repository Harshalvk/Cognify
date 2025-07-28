"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trpcClient } from "@/trpc/clients/client";
import { revalidatePath } from "@/util/actions/revalidatePath";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const DeleteReporter = ({ userId }: { userId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    isPending,
    error,
    mutateAsync: deleteReporter,
  } = trpcClient.reporters.delete.useMutation();

  useEffect(() => {
    if (data) {
      toast.success("Reporter Deleted!", { id: "delete-reporter" });
      setIsModalOpen(false);
      revalidatePath("/admin/manage-reporters");
    } else if (error) {
      toast.error("Something went wrong. Reporter not deleted.", {
        id: "delete-reporter",
      });
    }
  }, [data, error]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Reporter</DialogTitle>
          <DialogDescription>
            Confirm deletion of this reporter. This action is irreversible and
            will permanently revoke their access.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancle</Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={() => deleteReporter({ id: userId })}
          >
            {isPending && <Loader className="animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReporter;
