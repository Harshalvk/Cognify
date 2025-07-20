"use client";

import { useFormCreateUser } from "@/components/forms/createUser";
import { trpcClient } from "@/trpc/clients/client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { revalidatePath } from "@/util/actions/revalidatePath";

const CreateAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useFormCreateUser();

  const {
    data,
    isPending,
    error,
    mutateAsync: createAdmin,
  } = trpcClient.admins.create.useMutation();

  useEffect(() => {
    if (data) {
      reset();
      toast.success("Admin Created!");
      setIsModalOpen(false);
      revalidatePath("/admin/manage-admins");
    }
  }, [data, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.data?.code);
    }
  }, [error]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className={buttonVariants()}>Create Admin</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
          <DialogDescription>
            Please provide the UID of the user you wish to grant admin access.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-2 flex flex-col items-end"
          onSubmit={handleSubmit(async (data) => {
            await createAdmin(data);
          })}
        >
          <Input disabled={isPending} placeholder="UID" {...register("id")} />
          <Button disabled={isPending} className="w-fit">
            {isPending && <Loader className="animate-spin" />}
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdmin;
