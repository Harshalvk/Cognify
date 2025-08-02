"use client";

import { useFormCreateEditor } from "@/components/forms/createEditor";
import { ImageUpload } from "@/components/ImageUpload";
import { Title } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { trpcClient } from "@/trpc/clients/client";
import { revalidatePath } from "@/util/actions/revalidatePath";
import { $Enums } from "@prisma/client";
import { Bot, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const CreateEditorPage = () => {
  const form = useFormCreateEditor();

  const router = useRouter();

  const { watch, setValue } = form;

  const editorImageUrl = watch("editorImage");

  const {
    data,
    mutate: createEditor,
    isPending,
  } = trpcClient.editors.create.useMutation({
    onSuccess: () => {
      toast.success(`Editor ${data?.name} updated.`);
      form.reset();
      revalidatePath("/user/editors");
      router.push("/user/editors");
    },
    onError: () => {
      toast.error("Action failed.");
    },
  });

  return (
    <section className="p-4 max-w-5xl mx-auto">
      <Title>Create Editor</Title>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            createEditor(data);
          })}
          className="space-y-4 flex flex-col"
        >
          <div className="w-full grid md:grid-cols-2 gap-4">
            <div className="w-full space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Editor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Elon Rusk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="language"
                control={form.control}
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
                    <FormMessage />
                  </Select>
                )}
              />
              <FormField
                name="style"
                control={form.control}
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
                    <FormMessage />
                  </Select>
                )}
              />
              <FormField
                name="verbosity"
                control={form.control}
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
                    <FormMessage />
                  </Select>
                )}
              />
              <FormField
                name="wordComplexity"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Word Complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values($Enums.WordComplexity).map(
                        (complexity) => (
                          <SelectItem
                            className="w-full"
                            key={complexity}
                            value={complexity}
                          >
                            {complexity}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                    <FormMessage />
                  </Select>
                )}
              />
              <FormField
                name="additionalNotes"
                control={form.control}
                render={({ field }) => {
                  return (
                    <>
                      <Textarea placeholder="Editor description" {...field} />
                      <FormMessage />
                    </>
                  );
                }}
              />
            </div>
            <ImageUpload
              imageUrl={editorImageUrl}
              setValue={(imageUlr) => {
                setValue("editorImage", imageUlr);
              }}
            />
          </div>

          <Button type="submit" className="self-end">
            {isPending ? <Loader2 className="animate-spin" /> : <Bot />}
            Create Editor
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateEditorPage;
