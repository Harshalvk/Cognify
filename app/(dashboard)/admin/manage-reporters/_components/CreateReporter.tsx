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

const CreateReporter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useFormCreateUser();

  const {
    data,
    isPending,
    error,
    mutateAsync: createReporter,
  } = trpcClient.reporters.create.useMutation();

  useEffect(() => {
    if (data) {
      reset();
      toast.success("Reporter Created!");
      setIsModalOpen(false);
      revalidatePath("/admin/manage-reporters");
    }
  }, [data, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.data?.code);
    }
  }, [error]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className={buttonVariants()}>
        Create Reporter
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Reporter</DialogTitle>
          <DialogDescription>
            Please provide the UID of the user you wish to grant reporter
            access.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-2 flex flex-col items-end"
          onSubmit={handleSubmit(async (data) => {
            await createReporter(data);
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

export default CreateReporter;
