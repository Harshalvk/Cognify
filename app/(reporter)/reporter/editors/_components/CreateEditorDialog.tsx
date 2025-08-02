"use client";

import { useFormCreateEditor } from "@/components/forms/createEditor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { $Enums } from "@prisma/client";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const CreateEditorDialog = () => {
  const [open, setOpen] = useState(true);

  const { register, handleSubmit, control } = useFormCreateEditor();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Editor</Button>
      </DialogTrigger>
      <DialogContent className="w-[1700px]">
        <DialogTitle className="text-2xl font-semibold mb-4">
          Create New Editor
        </DialogTitle>

        <form
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
          })}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Input placeholder="Editor Name" {...register("name")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values($Enums.Language).map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name="style"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Style" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values($Enums.Style).map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name="verbosity"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Verbosity" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values($Enums.Verbosity).map((verbosity) => (
                      <SelectItem key={verbosity} value={verbosity}>
                        {verbosity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name="wordComplexity"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Word Complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values($Enums.WordComplexity).map((complexity) => (
                      <SelectItem
                        className="w-full"
                        key={complexity}
                        value={complexity}
                      >
                        {complexity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <Textarea placeholder="Note" {...register("additionalNotes")} />
          <Input type="file" />

          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditorDialog;
