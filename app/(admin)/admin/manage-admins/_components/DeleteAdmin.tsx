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

const DeleteAdmin = ({ userId }: { userId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    isPending,
    error,
    mutateAsync: deleteAdmin,
  } = trpcClient.admins.delete.useMutation();

  useEffect(() => {
    if (data) {
      toast.success("Admin Deleted!", { id: "delete-admin" });
      setIsModalOpen(false);
      revalidatePath("/admin/manage-admins");
    } else if (error) {
      toast.error("Something went wrong. Admin not deleted.", {
        id: "delete-admin",
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
          <DialogTitle>Delete Admin</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this admin? This action cannot be
            undone and will permanently remove the admin&apos;s access.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancle</Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={() => deleteAdmin({ id: userId })}
          >
            {isPending && <Loader className="animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAdmin;
